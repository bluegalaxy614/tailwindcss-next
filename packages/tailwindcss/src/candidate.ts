import type { DesignSystem } from './design-system'
import { decodeArbitraryValue } from './utils/decode-arbitrary-value'
import { segment } from './utils/segment'

const COLON = 0x3a
const DASH = 0x2d
const LOWER_A = 0x61
const LOWER_Z = 0x7a

type ArbitraryUtilityValue = {
  kind: 'arbitrary'

  /**
   * bg-[color:--my-color]
   *     ^^^^^
   */
  dataType: string | null

  /**
   * bg-[#0088cc]
   *     ^^^^^^^
   * bg-[--my_variable]
   * var(^^^^^^^^^^^^^)
   */
  value: string

  /**
   * bg-[--my_variable]
   *     ^^^^^^^^^^^^^
   */
  dashedIdent: string | null
}

export type NamedUtilityValue = {
  kind: 'named'

  /**
   * bg-red-500
   *    ^^^^^^^
   *
   * w-1/2
   *   ^
   */
  value: string

  /**
   * w-1/2
   *   ^^^
   */
  fraction: string | null
}

type ArbitraryModifier = {
  kind: 'arbitrary'

  /**
   * bg-red-500/[50%]
   *             ^^^
   */
  value: string

  /**
   * bg-red-500/[--my_variable]
   *             ^^^^^^^^^^^^^
   */
  dashedIdent: string | null
}

type NamedModifier = {
  kind: 'named'

  /**
   * bg-red-500/50
   *            ^^
   */
  value: string
}

export type CandidateModifier = ArbitraryModifier | NamedModifier

type ArbitraryVariantValue = {
  kind: 'arbitrary'
  value: string
}

type NamedVariantValue = {
  kind: 'named'
  value: string
}

export type Variant =
  /**
   * Arbitrary variants are variants that take a selector and generate a variant
   * on the fly.
   *
   * E.g.: `[&_p]`
   */
  | {
      kind: 'arbitrary'
      selector: string

      // If true, it can be applied as a child of a compound variant
      compounds: boolean
    }

  /**
   * Static variants are variants that don't take any arguments.
   *
   * E.g.: `hover`
   */
  | {
      kind: 'static'
      root: string

      // If true, it can be applied as a child of a compound variant
      compounds: boolean
    }

  /**
   * Functional variants are variants that can take an argument. The argument is
   * either a named variant value or an arbitrary variant value.
   *
   * E.g.:
   *
   * - `aria-disabled`
   * - `aria-[disabled]`
   * - `@container-size`          -> @container, with named value `size`
   * - `@container-[inline-size]` -> @container, with arbitrary variant value `inline-size`
   * - `@container`               -> @container, with no value
   */
  | {
      kind: 'functional'
      root: string
      value: ArbitraryVariantValue | NamedVariantValue | null
      modifier: ArbitraryModifier | NamedModifier | null

      // If true, it can be applied as a child of a compound variant
      compounds: boolean
    }

  /**
   * Compound variants are variants that take another variant as an argument.
   *
   * E.g.:
   *
   * - `has-[&_p]`
   * - `group-*`
   * - `peer-*`
   */
  | {
      kind: 'compound'
      root: string
      modifier: ArbitraryModifier | NamedModifier | null
      variant: Variant

      // If true, it can be applied as a child of a compound variant
      compounds: boolean
    }

export type Candidate =
  /**
   * Arbitrary candidates are candidates that register utilities on the fly with
   * a property and a value.
   *
   * E.g.:
   *
   * - `[color:red]`
   * - `[color:red]/50`
   * - `[color:red]/50!`
   */
  | {
      kind: 'arbitrary'
      property: string
      value: string
      modifier: ArbitraryModifier | NamedModifier | null
      variants: Variant[]
      important: boolean
    }

  /**
   * Static candidates are candidates that don't take any arguments.
   *
   * E.g.:
   *
   * - `underline`
   * - `flex`
   */
  | {
      kind: 'static'
      root: string
      variants: Variant[]
      negative: boolean
      important: boolean
    }

  /**
   * Functional candidates are candidates that can take an argument.
   *
   * E.g.:
   *
   * - `bg-red-500`
   * - `bg-[#0088cc]`
   * - `w-1/2`
   */
  | {
      kind: 'functional'
      root: string
      value: ArbitraryUtilityValue | NamedUtilityValue | null
      modifier: ArbitraryModifier | NamedModifier | null
      variants: Variant[]
      negative: boolean
      important: boolean
    }

export function parseCandidate(input: string, designSystem: DesignSystem): Candidate | null {
  // hover:focus:underline
  // ^^^^^ ^^^^^^           -> Variants
  //             ^^^^^^^^^  -> Base
  let rawVariants = segment(input, ':')

  // Safety: At this point it is safe to use TypeScript's non-null assertion
  // operator because even if the `input` was an empty string, splitting an
  // empty string by `:` will always result in an array with at least one
  // element.
  let base = rawVariants.pop()!

  let parsedCandidateVariants: Variant[] = []

  for (let i = rawVariants.length - 1; i >= 0; --i) {
    let parsedVariant = designSystem.parseVariant(rawVariants[i])
    if (parsedVariant === null) return null

    parsedCandidateVariants.push(parsedVariant)
  }

  let important = false
  let negative = false

  // Candidates that end with an exclamation mark are the important version with
  // higher specificity of the non-important candidate, e.g. `mx-4!`.
  if (base[base.length - 1] === '!') {
    important = true
    base = base.slice(0, -1)
  }

  // Legacy syntax with leading `!`, e.g. `!mx-4`.
  else if (base[0] === '!') {
    important = true
    base = base.slice(1)
  }

  // Candidates that start with a dash are the negative versions of another
  // candidate, e.g. `-mx-4`.
  if (base[0] === '-') {
    negative = true
    base = base.slice(1)
  }

  // Check for an exact match of a static utility first as long as it does not
  // look like an arbitrary value.
  if (designSystem.utilities.has(base, 'static') && !base.includes('[')) {
    return {
      kind: 'static',
      root: base,
      variants: parsedCandidateVariants,
      negative,
      important,
    }
  }

  // Figure out the new base and the modifier segment if present.
  //
  // E.g.:
  //
  // ```
  // bg-red-500/50
  // ^^^^^^^^^^    -> Base without modifier
  //            ^^ -> Modifier segment
  // ```
  let [baseWithoutModifier, modifierSegment = null, additionalModifier] = segment(base, '/')

  // If there's more than one modifier, the utility is invalid.
  //
  // E.g.:
  //
  // - `bg-red-500/50/50`
  if (additionalModifier) return null

  // Arbitrary properties
  if (baseWithoutModifier[0] === '[') {
    // Arbitrary properties should end with a `]`.
    if (baseWithoutModifier[baseWithoutModifier.length - 1] !== ']') return null

    // The property part of the arbitrary property can only start with a-z
    // lowercase or a dash `-` in case of vendor prefixes such as `-webkit-`
    // or `-moz-`.
    //
    // Otherwise, it is an invalid candidate, and skip continue parsing.
    let charCode = baseWithoutModifier.charCodeAt(1)
    if (charCode !== DASH && !(charCode >= LOWER_A && charCode <= LOWER_Z)) {
      return null
    }

    baseWithoutModifier = baseWithoutModifier.slice(1, -1)

    // Arbitrary properties consist of a property and a value separated by a
    // `:`. If the `:` cannot be found, then it is an invalid candidate, and we
    // can skip continue parsing.
    //
    // Since the property and the value should be separated by a `:`, we can
    // also verify that the colon is not the first or last character in the
    // candidate, because that would make it invalid as well.
    let idx = baseWithoutModifier.indexOf(':')
    if (idx === -1 || idx === 0 || idx === baseWithoutModifier.length - 1) return null

    let property = baseWithoutModifier.slice(0, idx)
    let value = decodeArbitraryValue(baseWithoutModifier.slice(idx + 1))

    return {
      kind: 'arbitrary',
      property,
      value,
      modifier: modifierSegment === null ? null : parseModifier(modifierSegment),
      variants: parsedCandidateVariants,
      important,
    }
  }

  // The root of the utility, e.g.: `bg-red-500`
  //                                 ^^
  let root: string | null = null

  // The value of the utility, e.g.: `bg-red-500`
  //                                     ^^^^^^^
  let value: string | null = null

  // If the base of the utility ends with a `]`, then we know it's an arbitrary
  // value. This also means that everything before the `[…]` part should be the
  // root of the utility.
  //
  // E.g.:
  //
  // ```
  // bg-[#0088cc]
  // ^^           -> Root
  //    ^^^^^^^^^ -> Arbitrary value
  //
  // bg-red-[#0088cc]
  // ^^^^^^           -> Root
  //        ^^^^^^^^^ -> Arbitrary value
  // ```
  if (baseWithoutModifier[baseWithoutModifier.length - 1] === ']') {
    let idx = baseWithoutModifier.indexOf('-[')
    if (idx === -1) return null

    root = baseWithoutModifier.slice(0, idx)

    // The root of the utility should exist as-is in the utilities map. If not,
    // it's an invalid utility and we can skip continue parsing.
    if (!designSystem.utilities.has(root, 'functional')) return null

    value = baseWithoutModifier.slice(idx + 1)
  }

  // Not an arbitrary value
  else {
    ;[root, value] = findRoot(baseWithoutModifier, (root: string) => {
      return designSystem.utilities.has(root, 'functional')
    })
  }

  // If there's no root, the candidate isn't a valid class and can be discarded.
  if (root === null) return null

  // If the leftover value is an empty string, it means that the value is an
  // invalid named value, e.g.: `bg-`. This makes the candidate invalid and we
  // can skip any further parsing.
  if (value === '') return null

  let candidate: Candidate = {
    kind: 'functional',
    root,
    modifier: modifierSegment === null ? null : parseModifier(modifierSegment),
    value: null,
    variants: parsedCandidateVariants,
    negative,
    important,
  }

  if (value === null) return candidate

  {
    let startArbitraryIdx = value.indexOf('[')
    let valueIsArbitrary = startArbitraryIdx !== -1

    if (valueIsArbitrary) {
      let arbitraryValue = value.slice(startArbitraryIdx + 1, -1)

      // Extract an explicit typehint if present, e.g. `bg-[color:var(--my-var)])`
      let typehint = ''
      for (let i = 0; i < arbitraryValue.length; i++) {
        let code = arbitraryValue.charCodeAt(i)

        // If we hit a ":", we're at the end of a typehint.
        if (code === COLON) {
          typehint = arbitraryValue.slice(0, i)
          arbitraryValue = arbitraryValue.slice(i + 1)
          break
        }

        // Keep iterating as long as we've only seen valid typehint characters.
        if (code === DASH || (code >= LOWER_A && code <= LOWER_Z)) {
          continue
        }

        // If we see any other character, there's no typehint so break early.
        break
      }

      // If an arbitrary value looks like a CSS variable, we automatically wrap
      // it with `var(...)`.
      //
      // But since some CSS properties accept a `<dashed-ident>` as a value
      // directly (e.g. `scroll-timeline-name`), we also store the original
      // value in case the utility matcher is interested in it without
      // `var(...)`.
      let dashedIdent: string | null = null
      if (arbitraryValue[0] === '-' && arbitraryValue[1] === '-') {
        dashedIdent = arbitraryValue
        arbitraryValue = `var(${arbitraryValue})`
      } else {
        arbitraryValue = decodeArbitraryValue(arbitraryValue)
      }

      candidate.value = {
        kind: 'arbitrary',
        dataType: typehint || null,
        value: arbitraryValue,
        dashedIdent,
      }
    } else {
      // Some utilities support fractions as values, e.g. `w-1/2`. Since it's
      // ambiguous whether the slash signals a modifier or not, we store the
      // fraction separately in case the utility matcher is interested in it.
      let fraction =
        modifierSegment === null || candidate.modifier?.kind === 'arbitrary'
          ? null
          : `${value.slice(value.lastIndexOf('-') + 1)}/${modifierSegment}`

      candidate.value = {
        kind: 'named',
        value,
        fraction,
      }
    }
  }

  return candidate
}

function parseModifier(modifier: string): CandidateModifier {
  if (modifier[0] === '[' && modifier[modifier.length - 1] === ']') {
    let arbitraryValue = modifier.slice(1, -1)

    // If an arbitrary value looks like a CSS variable, we automatically wrap
    // it with `var(...)`.
    //
    // But since some CSS properties accept a `<dashed-ident>` as a value
    // directly (e.g. `scroll-timeline-name`), we also store the original
    // value in case the utility matcher is interested in it without
    // `var(...)`.
    let dashedIdent: string | null = null
    if (arbitraryValue[0] === '-' && arbitraryValue[1] === '-') {
      dashedIdent = arbitraryValue
      arbitraryValue = `var(${arbitraryValue})`
    } else {
      arbitraryValue = decodeArbitraryValue(arbitraryValue)
    }

    return {
      kind: 'arbitrary',
      value: arbitraryValue,
      dashedIdent,
    }
  }

  return {
    kind: 'named',
    value: modifier,
  }
}

export function parseVariant(variant: string, designSystem: DesignSystem): Variant | null {
  // Arbitrary variants
  if (variant[0] === '[' && variant[variant.length - 1] === ']') {
    /**
     * TODO: Breaking change
     *
     * @deprecated Arbitrary variants containing at-rules with other selectors
     * are deprecated. Use stacked variants instead.
     *
     * Before:
     *  - `[@media(width>=123px){&:hover}]:`
     *
     * After:
     *  - `[@media(width>=123px)]:[&:hover]:`
     *  - `[@media(width>=123px)]:hover:`
     */
    if (variant[1] === '@' && variant.includes('&')) return null

    let selector = decodeArbitraryValue(variant.slice(1, -1))

    if (selector[0] !== '@') {
      // Ensure `&` is always present by wrapping the selector in `&:is(…)`
      //
      // E.g.:
      //
      // - `[p]:flex`
      if (!selector.includes('&')) {
        selector = `&:is(${selector})`
      }
    }

    return {
      kind: 'arbitrary',
      selector,
      compounds: true,
    }
  }

  // Static, functional and compound variants
  {
    // group-hover/group-name
    // ^^^^^^^^^^^            -> Variant without modifier
    //             ^^^^^^^^^^ -> Modifier
    let [variantWithoutModifier, modifier = null, additionalModifier] = segment(variant, '/')

    // If there's more than one modifier, the variant is invalid.
    //
    // E.g.:
    //
    // - `group-hover/foo/bar`
    if (additionalModifier) return null

    let [root, value] = findRoot(variantWithoutModifier, (root) => {
      return designSystem.variants.has(root)
    })

    // Variant is invalid, therefore the candidate is invalid and we can skip
    // continue parsing it.
    if (root === null) return null

    switch (designSystem.variants.kind(root)) {
      case 'static': {
        // Static variants do not have a value
        if (value !== null) return null

        // Static variants do not have a modifier
        if (modifier !== null) return null

        return {
          kind: 'static',
          root,
          compounds: designSystem.variants.compounds(root),
        }
      }

      case 'functional': {
        if (value === null) return null

        if (value[0] === '[' && value[value.length - 1] === ']') {
          return {
            kind: 'functional',
            root,
            modifier: modifier === null ? null : parseModifier(modifier),
            value: {
              kind: 'arbitrary',
              value: decodeArbitraryValue(value.slice(1, -1)),
            },
            compounds: designSystem.variants.compounds(root),
          }
        }

        return {
          kind: 'functional',
          root,
          modifier: modifier === null ? null : parseModifier(modifier),
          value: { kind: 'named', value },
          compounds: designSystem.variants.compounds(root),
        }
      }

      case 'compound': {
        if (value === null) return null

        let subVariant = designSystem.parseVariant(value)
        if (subVariant === null) return null
        if (subVariant.compounds === false) return null

        return {
          kind: 'compound',
          root,
          modifier: modifier === null ? null : { kind: 'named', value: modifier },
          variant: subVariant,
          compounds: designSystem.variants.compounds(root),
        }
      }
    }
  }

  return null
}

function findRoot(
  input: string,
  exists: (input: string) => boolean,
): [string | null, string | null] {
  // If there is an exact match, then that's the root.
  if (exists(input)) return [input, null]

  // Otherwise test every permutation of the input by iteratively removing
  // everything after the last dash.
  let idx = input.lastIndexOf('-')
  if (idx === -1) {
    // Variants starting with `@` are special because they don't need a `-`
    // after the `@` (E.g.: `@-lg` should be written as `@lg`).
    if (input[0] === '@' && exists('@')) {
      return ['@', input.slice(1)]
    }

    return [null, null]
  }

  // Determine the root and value by testing permutations of the incoming input.
  //
  // In case of a candidate like `bg-red-500`, this looks like:
  //
  // `bg-red-500` -> No match
  // `bg-red`     -> No match
  // `bg`         -> Match
  do {
    let maybeRoot = input.slice(0, idx)

    if (exists(maybeRoot)) {
      return [maybeRoot, input.slice(idx + 1)]
    }

    idx = input.lastIndexOf('-', idx - 1)
  } while (idx > 0)

  return [null, null]
}
