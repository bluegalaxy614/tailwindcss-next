import { expect, test } from 'vitest'
import { compileCss, run } from './test-utils/run'

const css = String.raw

test('force', () => {
  expect(run(['force:flex'])).toMatchInlineSnapshot(`
    ".force\\:flex {
      display: flex;
    }"
  `)
  expect(run(['force/foo:flex'])).toEqual('')
})

test('*', () => {
  expect(run(['*:flex'])).toMatchInlineSnapshot(`
    ":where(.\\*\\:flex > *) {
      display: flex;
    }"
  `)
  expect(run(['*/foo:flex'])).toEqual('')
})

test('first-letter', () => {
  expect(run(['first-letter:flex'])).toMatchInlineSnapshot(`
    ".first-letter\\:flex:first-letter {
      display: flex;
    }"
  `)
  expect(run(['first-letter/foo:flex'])).toEqual('')
})

test('first-line', () => {
  expect(run(['first-line:flex'])).toMatchInlineSnapshot(`
    ".first-line\\:flex:first-line {
      display: flex;
    }"
  `)
  expect(run(['first-line/foo:flex'])).toEqual('')
})

test('marker', () => {
  expect(run(['marker:flex'])).toMatchInlineSnapshot(`
    ".marker\\:flex ::marker, .marker\\:flex::marker {
      display: flex;
    }"
  `)
  expect(run(['marker/foo:flex'])).toEqual('')
})

test('selection', () => {
  expect(run(['selection:flex'])).toMatchInlineSnapshot(`
    ".selection\\:flex ::selection, .selection\\:flex::selection {
      display: flex;
    }"
  `)
  expect(run(['selection/foo:flex'])).toEqual('')
})

test('file', () => {
  expect(run(['file:flex'])).toMatchInlineSnapshot(`
    ".file\\:flex::file-selector-button {
      display: flex;
    }"
  `)
  expect(run(['file/foo:flex'])).toEqual('')
})

test('placeholder', () => {
  expect(run(['placeholder:flex'])).toMatchInlineSnapshot(`
    ".placeholder\\:flex::placeholder {
      display: flex;
    }"
  `)
  expect(run(['placeholder/foo:flex'])).toEqual('')
})

test('backdrop', () => {
  expect(run(['backdrop:flex'])).toMatchInlineSnapshot(`
    ".backdrop\\:flex::backdrop {
      display: flex;
    }"
  `)
  expect(run(['backdrop/foo:flex'])).toEqual('')
})

test('before', () => {
  expect(run(['before:flex'])).toMatchInlineSnapshot(`
    ".before\\:flex:before {
      content: var(--tw-content);
      display: flex;
    }

    @supports (-moz-orient: inline) {
      @layer base {
        *, :before, :after, ::backdrop {
          --tw-content: "";
        }
      }
    }

    @property --tw-content {
      syntax: "*";
      inherits: false;
      initial-value: "";
    }"
  `)
  expect(run(['before/foo:flex'])).toEqual('')
})

test('after', () => {
  expect(run(['after:flex'])).toMatchInlineSnapshot(`
    ".after\\:flex:after {
      content: var(--tw-content);
      display: flex;
    }

    @supports (-moz-orient: inline) {
      @layer base {
        *, :before, :after, ::backdrop {
          --tw-content: "";
        }
      }
    }

    @property --tw-content {
      syntax: "*";
      inherits: false;
      initial-value: "";
    }"
  `)
  expect(run(['after/foo:flex'])).toEqual('')
})

test('first', () => {
  expect(run(['first:flex', 'group-first:flex', 'peer-first:flex'])).toMatchInlineSnapshot(`
    ".group-first\\:flex:is(:where(.group):first-child *) {
      display: flex;
    }

    .peer-first\\:flex:is(:where(.peer):first-child ~ *) {
      display: flex;
    }

    .first\\:flex:first-child {
      display: flex;
    }"
  `)
  expect(run(['first/foo:flex'])).toEqual('')
})

test('last', () => {
  expect(run(['last:flex', 'group-last:flex', 'peer-last:flex'])).toMatchInlineSnapshot(`
    ".group-last\\:flex:is(:where(.group):last-child *) {
      display: flex;
    }

    .peer-last\\:flex:is(:where(.peer):last-child ~ *) {
      display: flex;
    }

    .last\\:flex:last-child {
      display: flex;
    }"
  `)
  expect(run(['last/foo:flex'])).toEqual('')
})

test('only', () => {
  expect(run(['only:flex', 'group-only:flex', 'peer-only:flex'])).toMatchInlineSnapshot(`
    ".group-only\\:flex:is(:where(.group):only-child *) {
      display: flex;
    }

    .peer-only\\:flex:is(:where(.peer):only-child ~ *) {
      display: flex;
    }

    .only\\:flex:only-child {
      display: flex;
    }"
  `)
  expect(run(['only/foo:flex'])).toEqual('')
})

test('odd', () => {
  expect(run(['odd:flex', 'group-odd:flex', 'peer-odd:flex'])).toMatchInlineSnapshot(`
    ".group-odd\\:flex:is(:where(.group):nth-child(odd) *) {
      display: flex;
    }

    .peer-odd\\:flex:is(:where(.peer):nth-child(odd) ~ *) {
      display: flex;
    }

    .odd\\:flex:nth-child(odd) {
      display: flex;
    }"
  `)
  expect(run(['odd/foo:flex'])).toEqual('')
})

test('even', () => {
  expect(run(['even:flex', 'group-even:flex', 'peer-even:flex'])).toMatchInlineSnapshot(`
    ".group-even\\:flex:is(:where(.group):nth-child(2n) *) {
      display: flex;
    }

    .peer-even\\:flex:is(:where(.peer):nth-child(2n) ~ *) {
      display: flex;
    }

    .even\\:flex:nth-child(2n) {
      display: flex;
    }"
  `)
  expect(run(['even/foo:flex'])).toEqual('')
})

test('first-of-type', () => {
  expect(run(['first-of-type:flex', 'group-first-of-type:flex', 'peer-first-of-type:flex']))
    .toMatchInlineSnapshot(`
      ".group-first-of-type\\:flex:is(:where(.group):first-of-type *) {
        display: flex;
      }

      .peer-first-of-type\\:flex:is(:where(.peer):first-of-type ~ *) {
        display: flex;
      }

      .first-of-type\\:flex:first-of-type {
        display: flex;
      }"
    `)
  expect(run(['first-of-type/foo:flex'])).toEqual('')
})

test('last-of-type', () => {
  expect(run(['last-of-type:flex', 'group-last-of-type:flex', 'peer-last-of-type:flex']))
    .toMatchInlineSnapshot(`
      ".group-last-of-type\\:flex:is(:where(.group):last-of-type *) {
        display: flex;
      }

      .peer-last-of-type\\:flex:is(:where(.peer):last-of-type ~ *) {
        display: flex;
      }

      .last-of-type\\:flex:last-of-type {
        display: flex;
      }"
    `)
  expect(run(['last-of-type/foo:flex'])).toEqual('')
})

test('only-of-type', () => {
  expect(run(['only-of-type:flex', 'group-only-of-type:flex', 'peer-only-of-type:flex']))
    .toMatchInlineSnapshot(`
      ".group-only-of-type\\:flex:is(:where(.group):only-of-type *) {
        display: flex;
      }

      .peer-only-of-type\\:flex:is(:where(.peer):only-of-type ~ *) {
        display: flex;
      }

      .only-of-type\\:flex:only-of-type {
        display: flex;
      }"
    `)
  expect(run(['only-of-type/foo:flex'])).toEqual('')
})

test('visited', () => {
  expect(run(['visited:flex', 'group-visited:flex', 'peer-visited:flex'])).toMatchInlineSnapshot(`
    ".group-visited\\:flex:is(:where(.group):visited *) {
      display: flex;
    }

    .peer-visited\\:flex:is(:where(.peer):visited ~ *) {
      display: flex;
    }

    .visited\\:flex:visited {
      display: flex;
    }"
  `)
  expect(run(['visited/foo:flex'])).toEqual('')
})

test('target', () => {
  expect(run(['target:flex', 'group-target:flex', 'peer-target:flex'])).toMatchInlineSnapshot(`
    ".group-target\\:flex:is(:where(.group):target *) {
      display: flex;
    }

    .peer-target\\:flex:is(:where(.peer):target ~ *) {
      display: flex;
    }

    .target\\:flex:target {
      display: flex;
    }"
  `)
  expect(run(['target/foo:flex'])).toEqual('')
})

test('open', () => {
  expect(run(['open:flex', 'group-open:flex', 'peer-open:flex'])).toMatchInlineSnapshot(`
    ".group-open\\:flex:is(:where(.group):is([open], :popover-open) *) {
      display: flex;
    }

    .peer-open\\:flex:is(:where(.peer):is([open], :popover-open) ~ *) {
      display: flex;
    }

    .open\\:flex:is([open], :popover-open) {
      display: flex;
    }"
  `)
  expect(run(['open/foo:flex'])).toEqual('')
})

test('default', () => {
  expect(run(['default:flex', 'group-default:flex', 'peer-default:flex'])).toMatchInlineSnapshot(`
    ".group-default\\:flex:is(:where(.group):default *) {
      display: flex;
    }

    .peer-default\\:flex:is(:where(.peer):default ~ *) {
      display: flex;
    }

    .default\\:flex:default {
      display: flex;
    }"
  `)
  expect(run(['default/foo:flex'])).toEqual('')
})

test('checked', () => {
  expect(run(['checked:flex', 'group-checked:flex', 'peer-checked:flex'])).toMatchInlineSnapshot(`
    ".group-checked\\:flex:is(:where(.group):checked *) {
      display: flex;
    }

    .peer-checked\\:flex:is(:where(.peer):checked ~ *) {
      display: flex;
    }

    .checked\\:flex:checked {
      display: flex;
    }"
  `)
  expect(run(['checked/foo:flex'])).toEqual('')
})

test('indeterminate', () => {
  expect(run(['indeterminate:flex', 'group-indeterminate:flex', 'peer-indeterminate:flex']))
    .toMatchInlineSnapshot(`
      ".group-indeterminate\\:flex:is(:where(.group):indeterminate *) {
        display: flex;
      }

      .peer-indeterminate\\:flex:is(:where(.peer):indeterminate ~ *) {
        display: flex;
      }

      .indeterminate\\:flex:indeterminate {
        display: flex;
      }"
    `)
  expect(run(['indeterminate/foo:flex'])).toEqual('')
})

test('placeholder-shown', () => {
  expect(
    run(['placeholder-shown:flex', 'group-placeholder-shown:flex', 'peer-placeholder-shown:flex']),
  ).toMatchInlineSnapshot(`
    ".group-placeholder-shown\\:flex:is(:where(.group):placeholder-shown *) {
      display: flex;
    }

    .peer-placeholder-shown\\:flex:is(:where(.peer):placeholder-shown ~ *) {
      display: flex;
    }

    .placeholder-shown\\:flex:placeholder-shown {
      display: flex;
    }"
  `)
  expect(run(['placeholder-shown/foo:flex'])).toEqual('')
})

test('autofill', () => {
  expect(run(['autofill:flex', 'group-autofill:flex', 'peer-autofill:flex']))
    .toMatchInlineSnapshot(`
      ".group-autofill\\:flex:is(:where(.group):autofill *) {
        display: flex;
      }

      .peer-autofill\\:flex:is(:where(.peer):autofill ~ *) {
        display: flex;
      }

      .autofill\\:flex:autofill {
        display: flex;
      }"
    `)
  expect(run(['autofill/foo:flex'])).toEqual('')
})

test('optional', () => {
  expect(run(['optional:flex', 'group-optional:flex', 'peer-optional:flex']))
    .toMatchInlineSnapshot(`
      ".group-optional\\:flex:is(:where(.group):optional *) {
        display: flex;
      }

      .peer-optional\\:flex:is(:where(.peer):optional ~ *) {
        display: flex;
      }

      .optional\\:flex:optional {
        display: flex;
      }"
    `)
  expect(run(['optional/foo:flex'])).toEqual('')
})

test('required', () => {
  expect(run(['required:flex', 'group-required:flex', 'peer-required:flex']))
    .toMatchInlineSnapshot(`
      ".group-required\\:flex:is(:where(.group):required *) {
        display: flex;
      }

      .peer-required\\:flex:is(:where(.peer):required ~ *) {
        display: flex;
      }

      .required\\:flex:required {
        display: flex;
      }"
    `)
  expect(run(['required/foo:flex'])).toEqual('')
})

test('valid', () => {
  expect(run(['valid:flex', 'group-valid:flex', 'peer-valid:flex'])).toMatchInlineSnapshot(`
    ".group-valid\\:flex:is(:where(.group):valid *) {
      display: flex;
    }

    .peer-valid\\:flex:is(:where(.peer):valid ~ *) {
      display: flex;
    }

    .valid\\:flex:valid {
      display: flex;
    }"
  `)
  expect(run(['valid/foo:flex'])).toEqual('')
})

test('invalid', () => {
  expect(run(['invalid:flex', 'group-invalid:flex', 'peer-invalid:flex'])).toMatchInlineSnapshot(`
    ".group-invalid\\:flex:is(:where(.group):invalid *) {
      display: flex;
    }

    .peer-invalid\\:flex:is(:where(.peer):invalid ~ *) {
      display: flex;
    }

    .invalid\\:flex:invalid {
      display: flex;
    }"
  `)
  expect(run(['invalid/foo:flex'])).toEqual('')
})

test('in-range', () => {
  expect(run(['in-range:flex', 'group-in-range:flex', 'peer-in-range:flex']))
    .toMatchInlineSnapshot(`
      ".group-in-range\\:flex:is(:where(.group):in-range *) {
        display: flex;
      }

      .peer-in-range\\:flex:is(:where(.peer):in-range ~ *) {
        display: flex;
      }

      .in-range\\:flex:in-range {
        display: flex;
      }"
    `)
  expect(run(['in-range/foo:flex'])).toEqual('')
})

test('out-of-range', () => {
  expect(run(['out-of-range:flex', 'group-out-of-range:flex', 'peer-out-of-range:flex']))
    .toMatchInlineSnapshot(`
      ".group-out-of-range\\:flex:is(:where(.group):out-of-range *) {
        display: flex;
      }

      .peer-out-of-range\\:flex:is(:where(.peer):out-of-range ~ *) {
        display: flex;
      }

      .out-of-range\\:flex:out-of-range {
        display: flex;
      }"
    `)
  expect(run(['out-of-range/foo:flex'])).toEqual('')
})

test('read-only', () => {
  expect(run(['read-only:flex', 'group-read-only:flex', 'peer-read-only:flex']))
    .toMatchInlineSnapshot(`
      ".group-read-only\\:flex:is(:where(.group):read-only *) {
        display: flex;
      }

      .peer-read-only\\:flex:is(:where(.peer):read-only ~ *) {
        display: flex;
      }

      .read-only\\:flex:read-only {
        display: flex;
      }"
    `)
  expect(run(['read-only/foo:flex'])).toEqual('')
})

test('empty', () => {
  expect(run(['empty:flex', 'group-empty:flex', 'peer-empty:flex'])).toMatchInlineSnapshot(`
    ".group-empty\\:flex:is(:where(.group):empty *) {
      display: flex;
    }

    .peer-empty\\:flex:is(:where(.peer):empty ~ *) {
      display: flex;
    }

    .empty\\:flex:empty {
      display: flex;
    }"
  `)
  expect(run(['empty/foo:flex'])).toEqual('')
})

test('focus-within', () => {
  expect(run(['focus-within:flex', 'group-focus-within:flex', 'peer-focus-within:flex']))
    .toMatchInlineSnapshot(`
      ".group-focus-within\\:flex:is(:where(.group):focus-within *) {
        display: flex;
      }

      .peer-focus-within\\:flex:is(:where(.peer):focus-within ~ *) {
        display: flex;
      }

      .focus-within\\:flex:focus-within {
        display: flex;
      }"
    `)
  expect(run(['focus-within/foo:flex'])).toEqual('')
})

test('hover', () => {
  expect(run(['hover:flex', 'group-hover:flex', 'peer-hover:flex'])).toMatchInlineSnapshot(`
    ".group-hover\\:flex:is(:where(.group):hover *) {
      display: flex;
    }

    .peer-hover\\:flex:is(:where(.peer):hover ~ *) {
      display: flex;
    }

    .hover\\:flex:hover {
      display: flex;
    }"
  `)
  expect(run(['hover/foo:flex'])).toEqual('')
})

test('focus', () => {
  expect(run(['focus:flex', 'group-focus:flex', 'peer-focus:flex'])).toMatchInlineSnapshot(`
    ".group-focus\\:flex:is(:where(.group):focus *) {
      display: flex;
    }

    .peer-focus\\:flex:is(:where(.peer):focus ~ *) {
      display: flex;
    }

    .focus\\:flex:focus {
      display: flex;
    }"
  `)
  expect(run(['focus/foo:flex'])).toEqual('')
})

test('group-hover group-focus sorting', () => {
  expect(run(['group-hover:flex', 'group-focus:flex'])).toMatchInlineSnapshot(`
    ".group-hover\\:flex:is(:where(.group):hover *) {
      display: flex;
    }

    .group-focus\\:flex:is(:where(.group):focus *) {
      display: flex;
    }"
  `)
  expect(run(['group-focus:flex', 'group-hover:flex'])).toMatchInlineSnapshot(`
    ".group-hover\\:flex:is(:where(.group):hover *) {
      display: flex;
    }

    .group-focus\\:flex:is(:where(.group):focus *) {
      display: flex;
    }"
  `)
})

test('focus-visible', () => {
  expect(run(['focus-visible:flex', 'group-focus-visible:flex', 'peer-focus-visible:flex']))
    .toMatchInlineSnapshot(`
      ".group-focus-visible\\:flex:is(:where(.group):focus-visible *) {
        display: flex;
      }

      .peer-focus-visible\\:flex:is(:where(.peer):focus-visible ~ *) {
        display: flex;
      }

      .focus-visible\\:flex:focus-visible {
        display: flex;
      }"
    `)
  expect(run(['focus-visible/foo:flex'])).toEqual('')
})

test('active', () => {
  expect(run(['active:flex', 'group-active:flex', 'peer-active:flex'])).toMatchInlineSnapshot(`
    ".group-active\\:flex:is(:where(.group):active *) {
      display: flex;
    }

    .peer-active\\:flex:is(:where(.peer):active ~ *) {
      display: flex;
    }

    .active\\:flex:active {
      display: flex;
    }"
  `)
  expect(run(['active/foo:flex'])).toEqual('')
})

test('enabled', () => {
  expect(run(['enabled:flex', 'group-enabled:flex', 'peer-enabled:flex'])).toMatchInlineSnapshot(`
    ".group-enabled\\:flex:is(:where(.group):enabled *) {
      display: flex;
    }

    .peer-enabled\\:flex:is(:where(.peer):enabled ~ *) {
      display: flex;
    }

    .enabled\\:flex:enabled {
      display: flex;
    }"
  `)
  expect(run(['enabled/foo:flex'])).toEqual('')
})

test('disabled', () => {
  expect(run(['disabled:flex', 'group-disabled:flex', 'peer-disabled:flex']))
    .toMatchInlineSnapshot(`
      ".group-disabled\\:flex:is(:where(.group):disabled *) {
        display: flex;
      }

      .peer-disabled\\:flex:is(:where(.peer):disabled ~ *) {
        display: flex;
      }

      .disabled\\:flex:disabled {
        display: flex;
      }"
    `)
  expect(run(['disabled/foo:flex'])).toEqual('')
})

test('group-[...]', () => {
  expect(
    run([
      'group-[&_p]:flex',
      'group-[&_p]:hover:flex',
      'hover:group-[&_p]:flex',
      'hover:group-[&_p]:hover:flex',
      'group-[&:hover]:group-[&_p]:flex',
    ]),
  ).toMatchInlineSnapshot(`
    ".group-\\[\\&_p\\]\\:flex:is(:where(.group) p *) {
      display: flex;
    }

    .group-\\[\\&\\:hover\\]\\:group-\\[\\&_p\\]\\:flex:is(:where(.group):hover *):is(:where(.group) p *) {
      display: flex;
    }

    .group-\\[\\&_p\\]\\:hover\\:flex:is(:where(.group) p *):hover {
      display: flex;
    }

    .hover\\:group-\\[\\&_p\\]\\:flex:hover:is(:where(.group) p *) {
      display: flex;
    }

    .hover\\:group-\\[\\&_p\\]\\:hover\\:flex:hover:is(:where(.group) p *):hover {
      display: flex;
    }"
  `)

  expect(
    compileCss(
      css`
        @tailwind utilities;
      `,
      ['group-[@media_foo]:flex'],
    ),
  ).toEqual('')
})

test('group-*', () => {
  expect(
    compileCss(
      css`
        @variant hocus {
          &:hover,
          &:focus {
            @slot;
          }
        }
        @tailwind utilities;
      `,
      [
        'group-hover:flex',
        'group-focus:flex',
        'group-hocus:flex',

        'group-hover:group-focus:flex',
        'group-focus:group-hover:flex',
      ],
    ),
  ).toMatchInlineSnapshot(`
    ".group-hover\\:flex:is(:where(.group):hover *) {
      display: flex;
    }

    .group-focus\\:flex:is(:where(.group):focus *) {
      display: flex;
    }

    .group-focus\\:group-hover\\:flex:is(:where(.group):focus *):is(:where(.group):hover *) {
      display: flex;
    }

    .group-hover\\:group-focus\\:flex:is(:where(.group):hover *):is(:where(.group):focus *) {
      display: flex;
    }

    .group-hocus\\:flex:is(:is(:where(.group):hover, :where(.group):focus) *) {
      display: flex;
    }"
  `)

  expect(
    compileCss(
      css`
        @variant custom-at-rule (@media foo);
        @variant nested-selectors {
          &:hover {
            &:focus {
              @slot;
            }
          }
        }
        @tailwind utilities;
      `,
      ['group-custom-at-rule:flex', 'group-nested-selectors:flex'],
    ),
  ).toEqual('')
})

test('peer-[...]', () => {
  expect(
    run([
      'peer-[&_p]:flex',
      'peer-[&_p]:hover:flex',
      'hover:peer-[&_p]:flex',
      'hover:peer-[&_p]:focus:flex',
      'peer-[&:hover]:peer-[&_p]:flex',
    ]),
  ).toMatchInlineSnapshot(`
    ".peer-\\[\\&_p\\]\\:flex:is(:where(.peer) p ~ *) {
      display: flex;
    }

    .peer-\\[\\&\\:hover\\]\\:peer-\\[\\&_p\\]\\:flex:is(:where(.peer):hover ~ *):is(:where(.peer) p ~ *) {
      display: flex;
    }

    .hover\\:peer-\\[\\&_p\\]\\:flex:hover:is(:where(.peer) p ~ *) {
      display: flex;
    }

    .peer-\\[\\&_p\\]\\:hover\\:flex:is(:where(.peer) p ~ *):hover {
      display: flex;
    }

    .hover\\:peer-\\[\\&_p\\]\\:focus\\:flex:hover:is(:where(.peer) p ~ *):focus {
      display: flex;
    }"
  `)

  expect(
    compileCss(
      css`
        @tailwind utilities;
      `,
      ['peer-[@media_foo]:flex'],
    ),
  ).toEqual('')
})

test('peer-*', () => {
  expect(
    compileCss(
      css`
        @variant hocus {
          &:hover,
          &:focus {
            @slot;
          }
        }
        @tailwind utilities;
      `,
      [
        'peer-hover:flex',
        'peer-focus:flex',
        'peer-hocus:flex',
        'peer-hover:peer-focus:flex',
        'peer-focus:peer-hover:flex',
      ],
    ),
  ).toMatchInlineSnapshot(`
    ".peer-hover\\:flex:is(:where(.peer):hover ~ *) {
      display: flex;
    }

    .peer-focus\\:flex:is(:where(.peer):focus ~ *) {
      display: flex;
    }

    .peer-focus\\:peer-hover\\:flex:is(:where(.peer):focus ~ *):is(:where(.peer):hover ~ *) {
      display: flex;
    }

    .peer-hover\\:peer-focus\\:flex:is(:where(.peer):hover ~ *):is(:where(.peer):focus ~ *) {
      display: flex;
    }

    .peer-hocus\\:flex:is(:is(:where(.peer):hover, :where(.peer):focus) ~ *) {
      display: flex;
    }"
  `)

  expect(
    compileCss(
      css`
        @variant custom-at-rule (@media foo);
        @variant nested-selectors {
          &:hover {
            &:focus {
              @slot;
            }
          }
        }
        @tailwind utilities;
      `,
      ['peer-custom-at-rule:flex', 'peer-nested-selectors:flex'],
    ),
  ).toEqual('')
})

test('ltr', () => {
  expect(run(['ltr:flex'])).toMatchInlineSnapshot(`
    ".ltr\\:flex:where([dir="ltr"], [dir="ltr"] *) {
      display: flex;
    }"
  `)
  expect(run(['ltr/foo:flex'])).toEqual('')
})

test('rtl', () => {
  expect(run(['rtl:flex'])).toMatchInlineSnapshot(`
    ".rtl\\:flex:where([dir="rtl"], [dir="rtl"] *) {
      display: flex;
    }"
  `)
  expect(run(['rtl/foo:flex'])).toEqual('')
})

test('motion-safe', () => {
  expect(run(['motion-safe:flex'])).toMatchInlineSnapshot(`
    "@media (prefers-reduced-motion: no-preference) {
      .motion-safe\\:flex {
        display: flex;
      }
    }"
  `)
  expect(run(['motion-safe/foo:flex'])).toEqual('')
})

test('motion-reduce', () => {
  expect(run(['motion-reduce:flex'])).toMatchInlineSnapshot(`
    "@media (prefers-reduced-motion: reduce) {
      .motion-reduce\\:flex {
        display: flex;
      }
    }"
  `)
  expect(run(['motion-reduce/foo:flex'])).toEqual('')
})

test('dark', () => {
  expect(run(['dark:flex'])).toMatchInlineSnapshot(`
    "@media (prefers-color-scheme: dark) {
      .dark\\:flex {
        display: flex;
      }
    }"
  `)
  expect(run(['dark/foo:flex'])).toEqual('')
})

test('starting', () => {
  expect(run(['starting:opacity-0'])).toMatchInlineSnapshot(`
    "@starting-style {
      .starting\\:opacity-0 {
        opacity: 0;
      }
    }"
  `)
  expect(run(['starting/foo:flex'])).toEqual('')
})

test('print', () => {
  expect(run(['print:flex'])).toMatchInlineSnapshot(`
    "@media print {
      .print\\:flex {
        display: flex;
      }
    }"
  `)
  expect(run(['print/foo:flex'])).toEqual('')
})

test('default breakpoints', () => {
  expect(
    compileCss(
      css`
        @theme {
          /* Breakpoints */
          --breakpoint-sm: 640px;
          --breakpoint-md: 768px;
          --breakpoint-lg: 1024px;
          --breakpoint-xl: 1280px;
          --breakpoint-2xl: 1536px;
        }
        @tailwind utilities;
      `,
      ['sm:flex', 'md:flex', 'lg:flex', 'xl:flex', '2xl:flex'],
    ),
  ).toMatchInlineSnapshot(`
    ":root {
      --breakpoint-sm: 640px;
      --breakpoint-md: 768px;
      --breakpoint-lg: 1024px;
      --breakpoint-xl: 1280px;
      --breakpoint-2xl: 1536px;
    }

    @media (width >= 640px) {
      .sm\\:flex {
        display: flex;
      }
    }

    @media (width >= 768px) {
      .md\\:flex {
        display: flex;
      }
    }

    @media (width >= 1024px) {
      .lg\\:flex {
        display: flex;
      }
    }

    @media (width >= 1280px) {
      .xl\\:flex {
        display: flex;
      }
    }

    @media (width >= 1536px) {
      .\\32 xl\\:flex {
        display: flex;
      }
    }"
  `)
  expect(
    compileCss(
      css`
        @theme reference {
          /* Breakpoints */
          --breakpoint-sm: 640px;
          --breakpoint-md: 768px;
          --breakpoint-lg: 1024px;
          --breakpoint-xl: 1280px;
          --breakpoint-2xl: 1536px;
        }
        @tailwind utilities;
      `,
      ['sm/foo:flex', 'md/foo:flex', 'lg/foo:flex', 'xl/foo:flex', '2xl/foo:flex'],
    ),
  ).toEqual('')
})

test('custom breakpoint', () => {
  expect(
    compileCss(
      css`
        @theme {
          --breakpoint-10xl: 5000px;
        }
        @tailwind utilities;
      `,
      ['10xl:flex'],
    ),
  ).toMatchInlineSnapshot(`
    ":root {
      --breakpoint-10xl: 5000px;
    }

    @media (width >= 5000px) {
      .\\31 0xl\\:flex {
        display: flex;
      }
    }"
  `)
})

test('max-*', () => {
  expect(
    compileCss(
      css`
        @theme {
          /* Explicitly ordered in a strange way */
          --breakpoint-sm: 640px;
          --breakpoint-lg: 1024px;
          --breakpoint-md: 768px;
        }
        @tailwind utilities;
      `,
      ['max-lg:flex', 'max-sm:flex', 'max-md:flex'],
    ),
  ).toMatchInlineSnapshot(`
    ":root {
      --breakpoint-sm: 640px;
      --breakpoint-lg: 1024px;
      --breakpoint-md: 768px;
    }

    @media (width < 1024px) {
      .max-lg\\:flex {
        display: flex;
      }
    }

    @media (width < 768px) {
      .max-md\\:flex {
        display: flex;
      }
    }

    @media (width < 640px) {
      .max-sm\\:flex {
        display: flex;
      }
    }"
  `)
  expect(
    compileCss(
      css`
        @theme reference {
          /* Explicitly ordered in a strange way */
          --breakpoint-sm: 640px;
          --breakpoint-lg: 1024px;
          --breakpoint-md: 768px;
        }
        @tailwind utilities;
      `,
      ['max-lg/foo:flex', 'max-sm/foo:flex', 'max-md/foo:flex'],
    ),
  ).toEqual('')
})

test('min-*', () => {
  expect(
    compileCss(
      css`
        @theme {
          /* Explicitly ordered in a strange way */
          --breakpoint-sm: 640px;
          --breakpoint-lg: 1024px;
          --breakpoint-md: 768px;
        }
        @tailwind utilities;
      `,
      ['min-lg:flex', 'min-sm:flex', 'min-md:flex'],
    ),
  ).toMatchInlineSnapshot(`
    ":root {
      --breakpoint-sm: 640px;
      --breakpoint-lg: 1024px;
      --breakpoint-md: 768px;
    }

    @media (width >= 640px) {
      .min-sm\\:flex {
        display: flex;
      }
    }

    @media (width >= 768px) {
      .min-md\\:flex {
        display: flex;
      }
    }

    @media (width >= 1024px) {
      .min-lg\\:flex {
        display: flex;
      }
    }"
  `)
  expect(
    compileCss(
      css`
        @theme reference {
          /* Explicitly ordered in a strange way */
          --breakpoint-sm: 640px;
          --breakpoint-lg: 1024px;
          --breakpoint-md: 768px;
        }
        @tailwind utilities;
      `,
      ['min-lg/foo:flex', 'min-sm/foo:flex', 'min-md/foo:flex'],
    ),
  ).toEqual('')
})

test('sorting stacked min-* and max-* variants', () => {
  expect(
    compileCss(
      css`
        @theme {
          /* Explicitly ordered in a strange way */
          --breakpoint-sm: 640px;
          --breakpoint-lg: 1024px;
          --breakpoint-md: 768px;
          --breakpoint-xl: 1280px;
          --breakpoint-xs: 280px;
        }
        @tailwind utilities;
      `,
      ['min-sm:max-xl:flex', 'min-md:max-xl:flex', 'min-xs:max-xl:flex'],
    ),
  ).toMatchInlineSnapshot(`
    ":root {
      --breakpoint-sm: 640px;
      --breakpoint-lg: 1024px;
      --breakpoint-md: 768px;
      --breakpoint-xl: 1280px;
      --breakpoint-xs: 280px;
    }

    @media (width >= 280px) {
      @media (width < 1280px) {
        .min-xs\\:max-xl\\:flex {
          display: flex;
        }
      }
    }

    @media (width >= 640px) {
      @media (width < 1280px) {
        .min-sm\\:max-xl\\:flex {
          display: flex;
        }
      }
    }

    @media (width >= 768px) {
      @media (width < 1280px) {
        .min-md\\:max-xl\\:flex {
          display: flex;
        }
      }
    }"
  `)
})

test('min, max and unprefixed breakpoints', () => {
  expect(
    compileCss(
      css`
        @theme {
          /* Explicitly ordered in a strange way */
          --breakpoint-sm: 640px;
          --breakpoint-lg: 1024px;
          --breakpoint-md: 768px;
        }
        @tailwind utilities;
      `,
      [
        'max-lg-sm-potato:flex',
        'min-lg-sm-potato:flex',
        'lg-sm-potato:flex',
        'max-lg:flex',
        'max-sm:flex',
        'min-lg:flex',
        'max-[1000px]:flex',
        'md:flex',
        'min-md:flex',
        'min-[700px]:flex',
        'max-md:flex',
        'min-sm:flex',
        'sm:flex',
        'lg:flex',
      ],
    ),
  ).toMatchInlineSnapshot(`
    ":root {
      --breakpoint-sm: 640px;
      --breakpoint-lg: 1024px;
      --breakpoint-md: 768px;
    }

    @media (width < 1024px) {
      .max-lg\\:flex {
        display: flex;
      }
    }

    @media (width < 1000px) {
      .max-\\[1000px\\]\\:flex {
        display: flex;
      }
    }

    @media (width < 768px) {
      .max-md\\:flex {
        display: flex;
      }
    }

    @media (width < 640px) {
      .max-sm\\:flex {
        display: flex;
      }
    }

    @media (width >= 640px) {
      .min-sm\\:flex {
        display: flex;
      }
    }

    @media (width >= 640px) {
      .sm\\:flex {
        display: flex;
      }
    }

    @media (width >= 700px) {
      .min-\\[700px\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= 768px) {
      .md\\:flex {
        display: flex;
      }
    }

    @media (width >= 768px) {
      .min-md\\:flex {
        display: flex;
      }
    }

    @media (width >= 1024px) {
      .lg\\:flex {
        display: flex;
      }
    }

    @media (width >= 1024px) {
      .min-lg\\:flex {
        display: flex;
      }
    }"
  `)
})

test('sorting `min` and `max` should sort by unit, then by value, then alphabetically', () => {
  expect(
    run([
      'min-[10px]:flex',
      'min-[12px]:flex',
      'min-[10em]:flex',
      'min-[12em]:flex',
      'min-[10rem]:flex',
      'min-[12rem]:flex',
      'max-[10px]:flex',
      'max-[12px]:flex',
      'max-[10em]:flex',
      'max-[12em]:flex',
      'max-[10rem]:flex',
      'max-[12rem]:flex',
      'min-[calc(1000px+12em)]:flex',
      'max-[calc(1000px+12em)]:flex',
      'min-[calc(50vh+12em)]:flex',
      'max-[calc(50vh+12em)]:flex',
      'min-[10vh]:flex',
      'min-[12vh]:flex',
      'max-[10vh]:flex',
      'max-[12vh]:flex',
    ]),
  ).toMatchInlineSnapshot(`
    "@media (width < calc(1000px + 12em)) {
      .max-\\[calc\\(1000px\\+12em\\)\\]\\:flex {
        display: flex;
      }
    }

    @media (width < calc(50vh + 12em)) {
      .max-\\[calc\\(50vh\\+12em\\)\\]\\:flex {
        display: flex;
      }
    }

    @media (width < 12em) {
      .max-\\[12em\\]\\:flex {
        display: flex;
      }
    }

    @media (width < 10em) {
      .max-\\[10em\\]\\:flex {
        display: flex;
      }
    }

    @media (width < 12px) {
      .max-\\[12px\\]\\:flex {
        display: flex;
      }
    }

    @media (width < 10px) {
      .max-\\[10px\\]\\:flex {
        display: flex;
      }
    }

    @media (width < 12rem) {
      .max-\\[12rem\\]\\:flex {
        display: flex;
      }
    }

    @media (width < 10rem) {
      .max-\\[10rem\\]\\:flex {
        display: flex;
      }
    }

    @media (width < 12vh) {
      .max-\\[12vh\\]\\:flex {
        display: flex;
      }
    }

    @media (width < 10vh) {
      .max-\\[10vh\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= calc(1000px + 12em)) {
      .min-\\[calc\\(1000px\\+12em\\)\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= calc(50vh + 12em)) {
      .min-\\[calc\\(50vh\\+12em\\)\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= 10em) {
      .min-\\[10em\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= 12em) {
      .min-\\[12em\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= 10px) {
      .min-\\[10px\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= 12px) {
      .min-\\[12px\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= 10rem) {
      .min-\\[10rem\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= 12rem) {
      .min-\\[12rem\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= 10vh) {
      .min-\\[10vh\\]\\:flex {
        display: flex;
      }
    }

    @media (width >= 12vh) {
      .min-\\[12vh\\]\\:flex {
        display: flex;
      }
    }"
  `)
})

test('supports', () => {
  expect(
    run([
      'supports-gap:grid',
      'supports-[display:grid]:flex',
      'supports-[selector(A_>_B)]:flex',
      'supports-[font-format(opentype)]:grid',
      'supports-[(display:grid)_and_font-format(opentype)]:grid',
      'supports-[font-tech(color-COLRv1)]:flex',
      'supports-[--test]:flex',
    ]),
  ).toMatchInlineSnapshot(`
    "@supports (gap: var(--tw)) {
      .supports-gap\\:grid {
        display: grid;
      }
    }

    @supports (display: grid) {
      .supports-\\[display\\:grid\\]\\:flex {
        display: flex;
      }
    }

    @supports selector(A > B) {
      .supports-\\[selector\\(A_\\>_B\\)\\]\\:flex {
        display: flex;
      }
    }

    @supports font-format(opentype) {
      .supports-\\[font-format\\(opentype\\)\\]\\:grid {
        display: grid;
      }
    }

    @supports (display: grid) and font-format(opentype) {
      .supports-\\[\\(display\\:grid\\)_and_font-format\\(opentype\\)\\]\\:grid {
        display: grid;
      }
    }

    @supports font-tech(color-COLRv1) {
      .supports-\\[font-tech\\(color-COLRv1\\)\\]\\:flex {
        display: flex;
      }
    }

    @supports (--test: var(--tw)) {
      .supports-\\[--test\\]\\:flex {
        display: flex;
      }
    }"
  `)
  expect(
    run([
      'supports-gap/foo:grid',
      'supports-[display:grid]/foo:flex',
      'supports-[selector(A_>_B)]/foo:flex',
      'supports-[font-format(opentype)]/foo:grid',
      'supports-[(display:grid)_and_font-format(opentype)]/foo:grid',
      'supports-[font-tech(color-COLRv1)]/foo:flex',
      'supports-[--test]/foo:flex',
    ]),
  ).toEqual('')
})

test('not', () => {
  expect(
    compileCss(
      css`
        @variant hocus {
          &:hover,
          &:focus {
            @slot;
          }
        }
        @tailwind utilities;
      `,
      [
        'not-[:checked]:flex',
        'not-hocus:flex',

        'group-not-[:checked]:flex',
        'group-not-[:checked]/parent-name:flex',
        'group-not-checked:flex',
        'group-not-hocus:flex',
        'group-not-hocus/parent-name:flex',

        'peer-not-[:checked]:flex',
        'peer-not-[:checked]/sibling-name:flex',
        'peer-not-checked:flex',
        'peer-not-hocus:flex',
        'peer-not-hocus/sibling-name:flex',
      ],
    ),
  ).toMatchInlineSnapshot(`
    ".not-hocus\\:flex:not(:hover, :focus) {
      display: flex;
    }

    .not-\\[\\:checked\\]\\:flex:not(:checked) {
      display: flex;
    }

    .group-not-checked\\:flex:is(:where(.group):not(:checked) *) {
      display: flex;
    }

    .group-not-hocus\\:flex:is(:where(.group):not(:hover, :focus) *) {
      display: flex;
    }

    .group-not-hocus\\/parent-name\\:flex:is(:where(.group\\/parent-name):not(:hover, :focus) *) {
      display: flex;
    }

    .group-not-\\[\\:checked\\]\\:flex:is(:where(.group):not(:checked) *) {
      display: flex;
    }

    .group-not-\\[\\:checked\\]\\/parent-name\\:flex:is(:where(.group\\/parent-name):not(:checked) *) {
      display: flex;
    }

    .peer-not-checked\\:flex:is(:where(.peer):not(:checked) ~ *) {
      display: flex;
    }

    .peer-not-hocus\\:flex:is(:where(.peer):not(:hover, :focus) ~ *) {
      display: flex;
    }

    .peer-not-hocus\\/sibling-name\\:flex:is(:where(.peer\\/sibling-name):not(:hover, :focus) ~ *) {
      display: flex;
    }

    .peer-not-\\[\\:checked\\]\\:flex:is(:where(.peer):not(:checked) ~ *) {
      display: flex;
    }

    .peer-not-\\[\\:checked\\]\\/sibling-name\\:flex:is(:where(.peer\\/sibling-name):not(:checked) ~ *) {
      display: flex;
    }"
  `)

  expect(
    compileCss(
      css`
        @variant custom-at-rule (@media foo);
        @variant nested-selectors {
          &:hover {
            &:focus {
              @slot;
            }
          }
        }
        @tailwind utilities;
      `,
      [
        'not-[:checked]/foo:flex',
        'not-[@media_print]:flex',
        'not-custom-at-rule:flex',
        'not-nested-selectors:flex',
      ],
    ),
  ).toEqual('')
})

test('has', () => {
  expect(
    compileCss(
      css`
        @variant hocus {
          &:hover,
          &:focus {
            @slot;
          }
        }
        @tailwind utilities;
      `,
      [
        'has-[:checked]:flex',
        'has-hocus:flex',

        'group-has-[:checked]:flex',
        'group-has-[:checked]/parent-name:flex',
        'group-has-checked:flex',
        'group-has-hocus:flex',
        'group-has-hocus/parent-name:flex',

        'peer-has-[:checked]:flex',
        'peer-has-[:checked]/sibling-name:flex',
        'peer-has-checked:flex',
        'peer-has-hocus:flex',
        'peer-has-hocus/sibling-name:flex',
      ],
    ),
  ).toMatchInlineSnapshot(`
    ".group-has-checked\\:flex:is(:where(.group):has(:checked) *) {
      display: flex;
    }

    .group-has-hocus\\:flex:is(:where(.group):has(:hover, :focus) *) {
      display: flex;
    }

    .group-has-hocus\\/parent-name\\:flex:is(:where(.group\\/parent-name):has(:hover, :focus) *) {
      display: flex;
    }

    .group-has-\\[\\:checked\\]\\:flex:is(:where(.group):has(:checked) *) {
      display: flex;
    }

    .group-has-\\[\\:checked\\]\\/parent-name\\:flex:is(:where(.group\\/parent-name):has(:checked) *) {
      display: flex;
    }

    .peer-has-checked\\:flex:is(:where(.peer):has(:checked) ~ *) {
      display: flex;
    }

    .peer-has-hocus\\:flex:is(:where(.peer):has(:hover, :focus) ~ *) {
      display: flex;
    }

    .peer-has-hocus\\/sibling-name\\:flex:is(:where(.peer\\/sibling-name):has(:hover, :focus) ~ *) {
      display: flex;
    }

    .peer-has-\\[\\:checked\\]\\:flex:is(:where(.peer):has(:checked) ~ *) {
      display: flex;
    }

    .peer-has-\\[\\:checked\\]\\/sibling-name\\:flex:is(:where(.peer\\/sibling-name):has(:checked) ~ *) {
      display: flex;
    }

    .has-hocus\\:flex:has(:hover, :focus) {
      display: flex;
    }

    .has-\\[\\:checked\\]\\:flex:has(:checked) {
      display: flex;
    }"
  `)

  expect(
    compileCss(
      css`
        @variant custom-at-rule (@media foo);
        @variant nested-selectors {
          &:hover {
            &:focus {
              @slot;
            }
          }
        }
        @tailwind utilities;
      `,
      [
        'has-[:checked]/foo:flex',
        'has-[@media_print]:flex',
        'has-custom-at-rule:flex',
        'has-nested-selectors:flex',
      ],
    ),
  ).toEqual('')
})

test('aria', () => {
  expect(
    run([
      'aria-checked:flex',
      'aria-[invalid=spelling]:flex',
      'aria-[valuenow=1]:flex',

      'group-aria-[modal]:flex',
      'group-aria-checked:flex',
      'group-aria-[valuenow=1]:flex',
      'group-aria-[modal]/parent-name:flex',
      'group-aria-checked/parent-name:flex',
      'group-aria-[valuenow=1]/parent-name:flex',

      'peer-aria-[modal]:flex',
      'peer-aria-checked:flex',
      'peer-aria-[valuenow=1]:flex',
      'peer-aria-[modal]/parent-name:flex',
      'peer-aria-checked/parent-name:flex',
      'peer-aria-[valuenow=1]/parent-name:flex',
    ]),
  ).toMatchInlineSnapshot(`
    ".group-aria-\\[modal\\]\\:flex:is(:where(.group)[aria-modal] *) {
      display: flex;
    }

    .group-aria-checked\\:flex:is(:where(.group)[aria-checked="true"] *) {
      display: flex;
    }

    .group-aria-\\[valuenow\\=1\\]\\:flex:is(:where(.group)[aria-valuenow="1"] *) {
      display: flex;
    }

    .group-aria-\\[modal\\]\\/parent-name\\:flex:is(:where(.group\\/parent-name)[aria-modal] *) {
      display: flex;
    }

    .group-aria-checked\\/parent-name\\:flex:is(:where(.group\\/parent-name)[aria-checked="true"] *) {
      display: flex;
    }

    .group-aria-\\[valuenow\\=1\\]\\/parent-name\\:flex:is(:where(.group\\/parent-name)[aria-valuenow="1"] *) {
      display: flex;
    }

    .peer-aria-\\[modal\\]\\:flex:is(:where(.peer)[aria-modal] ~ *) {
      display: flex;
    }

    .peer-aria-checked\\:flex:is(:where(.peer)[aria-checked="true"] ~ *) {
      display: flex;
    }

    .peer-aria-\\[valuenow\\=1\\]\\:flex:is(:where(.peer)[aria-valuenow="1"] ~ *) {
      display: flex;
    }

    .peer-aria-\\[modal\\]\\/parent-name\\:flex:is(:where(.peer\\/parent-name)[aria-modal] ~ *) {
      display: flex;
    }

    .peer-aria-checked\\/parent-name\\:flex:is(:where(.peer\\/parent-name)[aria-checked="true"] ~ *) {
      display: flex;
    }

    .peer-aria-\\[valuenow\\=1\\]\\/parent-name\\:flex:is(:where(.peer\\/parent-name)[aria-valuenow="1"] ~ *) {
      display: flex;
    }

    .aria-checked\\:flex[aria-checked="true"] {
      display: flex;
    }

    .aria-\\[invalid\\=spelling\\]\\:flex[aria-invalid="spelling"] {
      display: flex;
    }

    .aria-\\[valuenow\\=1\\]\\:flex[aria-valuenow="1"] {
      display: flex;
    }"
  `)
  expect(run(['aria-checked/foo:flex', 'aria-[invalid=spelling]/foo:flex'])).toEqual('')
})

test('data', () => {
  expect(
    run([
      'data-disabled:flex',
      'data-[potato=salad]:flex',
      'data-[foo=1]:flex',
      'data-[foo=bar_baz]:flex',
      "data-[foo$='bar'_i]:flex",
      'data-[foo$=bar_baz_i]:flex',

      'group-data-[disabled]:flex',
      'group-data-[disabled]/parent-name:flex',
      'group-data-[foo=1]:flex',
      'group-data-[foo=1]/parent-name:flex',
      'group-data-[foo=bar baz]/parent-name:flex',
      "group-data-[foo$='bar'_i]/parent-name:flex",
      'group-data-[foo$=bar_baz_i]/parent-name:flex',

      'peer-data-[disabled]:flex',
      'peer-data-[disabled]/parent-name:flex',
      'peer-data-[foo=1]:flex',
      'peer-data-[foo=1]/parent-name:flex',
      'peer-data-[foo=bar baz]/parent-name:flex',
      "peer-data-[foo$='bar'_i]/parent-name:flex",
      'peer-data-[foo$=bar_baz_i]/parent-name:flex',
    ]),
  ).toMatchInlineSnapshot(`
    ".group-data-\\[disabled\\]\\:flex:is(:where(.group)[data-disabled] *) {
      display: flex;
    }

    .group-data-\\[disabled\\]\\/parent-name\\:flex:is(:where(.group\\/parent-name)[data-disabled] *) {
      display: flex;
    }

    .group-data-\\[foo\\=1\\]\\:flex:is(:where(.group)[data-foo="1"] *) {
      display: flex;
    }

    .group-data-\\[foo\\=1\\]\\/parent-name\\:flex:is(:where(.group\\/parent-name)[data-foo="1"] *) {
      display: flex;
    }

    .group-data-\\[foo\\=bar\\ baz\\]\\/parent-name\\:flex:is(:where(.group\\/parent-name)[data-foo="bar baz"] *) {
      display: flex;
    }

    .group-data-\\[foo\\$\\=\\'bar\\'_i\\]\\/parent-name\\:flex:is(:where(.group\\/parent-name)[data-foo$="bar" i] *) {
      display: flex;
    }

    .group-data-\\[foo\\$\\=bar_baz_i\\]\\/parent-name\\:flex:is(:where(.group\\/parent-name)[data-foo$="bar baz" i] *) {
      display: flex;
    }

    .peer-data-\\[disabled\\]\\:flex:is(:where(.peer)[data-disabled] ~ *) {
      display: flex;
    }

    .peer-data-\\[disabled\\]\\/parent-name\\:flex:is(:where(.peer\\/parent-name)[data-disabled] ~ *) {
      display: flex;
    }

    .peer-data-\\[foo\\=1\\]\\:flex:is(:where(.peer)[data-foo="1"] ~ *) {
      display: flex;
    }

    .peer-data-\\[foo\\=1\\]\\/parent-name\\:flex:is(:where(.peer\\/parent-name)[data-foo="1"] ~ *) {
      display: flex;
    }

    .peer-data-\\[foo\\=bar\\ baz\\]\\/parent-name\\:flex:is(:where(.peer\\/parent-name)[data-foo="bar baz"] ~ *) {
      display: flex;
    }

    .peer-data-\\[foo\\$\\=\\'bar\\'_i\\]\\/parent-name\\:flex:is(:where(.peer\\/parent-name)[data-foo$="bar" i] ~ *) {
      display: flex;
    }

    .peer-data-\\[foo\\$\\=bar_baz_i\\]\\/parent-name\\:flex:is(:where(.peer\\/parent-name)[data-foo$="bar baz" i] ~ *) {
      display: flex;
    }

    .data-disabled\\:flex[data-disabled] {
      display: flex;
    }

    .data-\\[potato\\=salad\\]\\:flex[data-potato="salad"] {
      display: flex;
    }

    .data-\\[foo\\=1\\]\\:flex[data-foo="1"] {
      display: flex;
    }

    .data-\\[foo\\=bar_baz\\]\\:flex[data-foo="bar baz"] {
      display: flex;
    }

    .data-\\[foo\\$\\=\\'bar\\'_i\\]\\:flex[data-foo$="bar" i] {
      display: flex;
    }

    .data-\\[foo\\$\\=bar_baz_i\\]\\:flex[data-foo$="bar baz" i] {
      display: flex;
    }"
  `)
  expect(run(['data-disabled/foo:flex', 'data-[potato=salad]/foo:flex'])).toEqual('')
})

test('portrait', () => {
  expect(run(['portrait:flex'])).toMatchInlineSnapshot(`
    "@media (orientation: portrait) {
      .portrait\\:flex {
        display: flex;
      }
    }"
  `)
  expect(run(['portrait/foo:flex'])).toEqual('')
})

test('landscape', () => {
  expect(run(['landscape:flex'])).toMatchInlineSnapshot(`
    "@media (orientation: landscape) {
      .landscape\\:flex {
        display: flex;
      }
    }"
  `)
  expect(run(['landscape/foo:flex'])).toEqual('')
})

test('contrast-more', () => {
  expect(run(['contrast-more:flex'])).toMatchInlineSnapshot(`
    "@media (prefers-contrast: more) {
      .contrast-more\\:flex {
        display: flex;
      }
    }"
  `)
  expect(run(['contrast-more/foo:flex'])).toEqual('')
})

test('contrast-less', () => {
  expect(run(['contrast-less:flex'])).toMatchInlineSnapshot(`
    "@media (prefers-contrast: less) {
      .contrast-less\\:flex {
        display: flex;
      }
    }"
  `)
  expect(run(['contrast-less/foo:flex'])).toEqual('')
})

test('forced-colors', () => {
  expect(run(['forced-colors:flex'])).toMatchInlineSnapshot(`
    "@media (forced-colors: active) {
      .forced-colors\\:flex {
        display: flex;
      }
    }"
  `)
  expect(run(['forced-colors/foo:flex'])).toEqual('')
})

test('nth', () => {
  expect(
    run([
      'nth-3:flex',
      'nth-[2n+1]:flex',
      'nth-[2n+1_of_.foo]:flex',
      'nth-last-3:flex',
      'nth-last-[2n+1]:flex',
      'nth-last-[2n+1_of_.foo]:flex',
      'nth-of-type-3:flex',
      'nth-of-type-[2n+1]:flex',
      'nth-last-of-type-3:flex',
      'nth-last-of-type-[2n+1]:flex',
    ]),
  ).toMatchInlineSnapshot(`
    ".nth-3\\:flex:nth-child(3) {
      display: flex;
    }

    .nth-\\[2n\\+1\\]\\:flex:nth-child(odd) {
      display: flex;
    }

    .nth-\\[2n\\+1_of_\\.foo\\]\\:flex:nth-child(odd of .foo) {
      display: flex;
    }

    .nth-last-3\\:flex:nth-last-child(3) {
      display: flex;
    }

    .nth-last-\\[2n\\+1\\]\\:flex:nth-last-child(odd) {
      display: flex;
    }

    .nth-last-\\[2n\\+1_of_\\.foo\\]\\:flex:nth-last-child(odd of .foo) {
      display: flex;
    }

    .nth-of-type-3\\:flex:nth-of-type(3) {
      display: flex;
    }

    .nth-of-type-\\[2n\\+1\\]\\:flex:nth-of-type(odd) {
      display: flex;
    }

    .nth-last-of-type-3\\:flex:nth-last-of-type(3) {
      display: flex;
    }

    .nth-last-of-type-\\[2n\\+1\\]\\:flex:nth-last-of-type(odd) {
      display: flex;
    }"
  `)

  expect(
    run(['nth-foo:flex', 'nth-of-type-foo:flex', 'nth-last-foo:flex', 'nth-last-of-type-foo:flex']),
  ).toEqual('')
  expect(
    run([
      'nth-3/foo:flex',
      'nth-[2n+1]/foo:flex',
      'nth-[2n+1_of_.foo]/foo:flex',
      'nth-last-3/foo:flex',
      'nth-last-[2n+1]/foo:flex',
      'nth-last-[2n+1_of_.foo]/foo:flex',
      'nth-of-type-3/foo:flex',
      'nth-of-type-[2n+1]/foo:flex',
      'nth-last-of-type-3/foo:flex',
      'nth-last-of-type-[2n+1]/foo:flex',
    ]),
  ).toEqual('')
})

test('container queries', () => {
  expect(
    compileCss(
      css`
        @theme {
          --width-lg: 1024px;
        }
        @tailwind utilities;
      `,
      [
        '@lg:flex',
        '@lg/name:flex',
        '@[123px]:flex',
        '@[456px]/name:flex',

        '@min-lg:flex',
        '@min-lg/name:flex',
        '@min-[123px]:flex',
        '@min-[456px]/name:flex',

        '@max-lg:flex',
        '@max-lg/name:flex',
        '@max-[123px]:flex',
        '@max-[456px]/name:flex',
      ],
    ),
  ).toMatchInlineSnapshot(`
    ":root {
      --width-lg: 1024px;
    }

    @container (width < 1024px) {
      .\\@max-lg\\:flex {
        display: flex;
      }
    }

    @container name (width < 1024px) {
      .\\@max-lg\\/name\\:flex {
        display: flex;
      }
    }

    @container name (width < 456px) {
      .\\@max-\\[456px\\]\\/name\\:flex {
        display: flex;
      }
    }

    @container (width < 123px) {
      .\\@max-\\[123px\\]\\:flex {
        display: flex;
      }
    }

    @container (width >= 123px) {
      .\\@\\[123px\\]\\:flex {
        display: flex;
      }
    }

    @container (width >= 123px) {
      .\\@min-\\[123px\\]\\:flex {
        display: flex;
      }
    }

    @container name (width >= 456px) {
      .\\@\\[456px\\]\\/name\\:flex {
        display: flex;
      }
    }

    @container name (width >= 456px) {
      .\\@min-\\[456px\\]\\/name\\:flex {
        display: flex;
      }
    }

    @container (width >= 1024px) {
      .\\@lg\\:flex {
        display: flex;
      }
    }

    @container name (width >= 1024px) {
      .\\@lg\\/name\\:flex {
        display: flex;
      }
    }

    @container (width >= 1024px) {
      .\\@min-lg\\:flex {
        display: flex;
      }
    }

    @container name (width >= 1024px) {
      .\\@min-lg\\/name\\:flex {
        display: flex;
      }
    }"
  `)
})

test('variant order', () => {
  expect(
    compileCss(
      css`
        @theme {
          --breakpoint-sm: 640px;
          --breakpoint-md: 768px;
          --breakpoint-lg: 1024px;
          --breakpoint-xl: 1280px;
          --breakpoint-2xl: 1536px;
        }
        @tailwind utilities;
      `,
      [
        '[&_p]:flex',
        '2xl:flex',
        'active:flex',
        'after:flex',
        'aria-[custom=true]:flex',
        'aria-busy:flex',
        'aria-checked:flex',
        'aria-disabled:flex',
        'aria-expanded:flex',
        'aria-hidden:flex',
        'aria-pressed:flex',
        'aria-readonly:flex',
        'aria-required:flex',
        'aria-selected:flex',
        'autofill:flex',
        'backdrop:flex',
        'before:flex',
        'checked:flex',
        'contrast-less:flex',
        'contrast-more:flex',
        'dark:flex',
        'data-[custom=true]:flex',
        'default:flex',
        'disabled:flex',
        'empty:flex',
        'enabled:flex',
        'even:flex',
        'file:flex',
        'first-letter:flex',
        'first-line:flex',
        'first-of-type:flex',
        'first:flex',
        'focus-visible:flex',
        'focus-within:flex',
        'focus:flex',
        'forced-colors:flex',
        'group-hover:flex',
        'has-[:hover]:flex',
        'hover:flex',
        'in-range:flex',
        'indeterminate:flex',
        'invalid:flex',
        'landscape:flex',
        'last-of-type:flex',
        'last:flex',
        'lg:flex',
        'ltr:flex',
        'marker:flex',
        'md:flex',
        'motion-reduce:flex',
        'motion-safe:flex',
        'odd:flex',
        'only-of-type:flex',
        'only:flex',
        'open:flex',
        'optional:flex',
        'out-of-range:flex',
        'peer-hover:flex',
        'placeholder-shown:flex',
        'placeholder:flex',
        'portrait:flex',
        'print:flex',
        'read-only:flex',
        'required:flex',
        'rtl:flex',
        'selection:flex',
        'sm:flex',
        'supports-[display:flex]:flex',
        'target:flex',
        'valid:flex',
        'visited:flex',
        'xl:flex',
      ],
    ),
  ).toMatchInlineSnapshot(`
    ":root {
      --breakpoint-sm: 640px;
      --breakpoint-md: 768px;
      --breakpoint-lg: 1024px;
      --breakpoint-xl: 1280px;
      --breakpoint-2xl: 1536px;
    }

    .group-hover\\:flex:is(:where(.group):hover *) {
      display: flex;
    }

    .peer-hover\\:flex:is(:where(.peer):hover ~ *) {
      display: flex;
    }

    .first-letter\\:flex:first-letter {
      display: flex;
    }

    .first-line\\:flex:first-line {
      display: flex;
    }

    .marker\\:flex ::marker, .marker\\:flex::marker {
      display: flex;
    }

    .selection\\:flex ::selection, .selection\\:flex::selection {
      display: flex;
    }

    .file\\:flex::file-selector-button {
      display: flex;
    }

    .placeholder\\:flex::placeholder {
      display: flex;
    }

    .backdrop\\:flex::backdrop {
      display: flex;
    }

    .before\\:flex:before {
      content: var(--tw-content);
      display: flex;
    }

    .after\\:flex:after {
      content: var(--tw-content);
      display: flex;
    }

    .first\\:flex:first-child {
      display: flex;
    }

    .last\\:flex:last-child {
      display: flex;
    }

    .only\\:flex:only-child {
      display: flex;
    }

    .odd\\:flex:nth-child(odd) {
      display: flex;
    }

    .even\\:flex:nth-child(2n) {
      display: flex;
    }

    .first-of-type\\:flex:first-of-type {
      display: flex;
    }

    .last-of-type\\:flex:last-of-type {
      display: flex;
    }

    .only-of-type\\:flex:only-of-type {
      display: flex;
    }

    .visited\\:flex:visited {
      display: flex;
    }

    .target\\:flex:target {
      display: flex;
    }

    .open\\:flex:is([open], :popover-open) {
      display: flex;
    }

    .default\\:flex:default {
      display: flex;
    }

    .checked\\:flex:checked {
      display: flex;
    }

    .indeterminate\\:flex:indeterminate {
      display: flex;
    }

    .placeholder-shown\\:flex:placeholder-shown {
      display: flex;
    }

    .autofill\\:flex:autofill {
      display: flex;
    }

    .optional\\:flex:optional {
      display: flex;
    }

    .required\\:flex:required {
      display: flex;
    }

    .valid\\:flex:valid {
      display: flex;
    }

    .invalid\\:flex:invalid {
      display: flex;
    }

    .in-range\\:flex:in-range {
      display: flex;
    }

    .out-of-range\\:flex:out-of-range {
      display: flex;
    }

    .read-only\\:flex:read-only {
      display: flex;
    }

    .empty\\:flex:empty {
      display: flex;
    }

    .focus-within\\:flex:focus-within {
      display: flex;
    }

    .hover\\:flex:hover {
      display: flex;
    }

    .focus\\:flex:focus {
      display: flex;
    }

    .focus-visible\\:flex:focus-visible {
      display: flex;
    }

    .active\\:flex:active {
      display: flex;
    }

    .enabled\\:flex:enabled {
      display: flex;
    }

    .disabled\\:flex:disabled {
      display: flex;
    }

    .has-\\[\\:hover\\]\\:flex:has(:hover) {
      display: flex;
    }

    .aria-\\[custom\\=true\\]\\:flex[aria-custom="true"] {
      display: flex;
    }

    .aria-busy\\:flex[aria-busy="true"] {
      display: flex;
    }

    .aria-checked\\:flex[aria-checked="true"] {
      display: flex;
    }

    .aria-disabled\\:flex[aria-disabled="true"] {
      display: flex;
    }

    .aria-expanded\\:flex[aria-expanded="true"] {
      display: flex;
    }

    .aria-hidden\\:flex[aria-hidden="true"] {
      display: flex;
    }

    .aria-pressed\\:flex[aria-pressed="true"] {
      display: flex;
    }

    .aria-readonly\\:flex[aria-readonly="true"] {
      display: flex;
    }

    .aria-required\\:flex[aria-required="true"] {
      display: flex;
    }

    .aria-selected\\:flex[aria-selected="true"] {
      display: flex;
    }

    .data-\\[custom\\=true\\]\\:flex[data-custom="true"] {
      display: flex;
    }

    @supports (display: flex) {
      .supports-\\[display\\:flex\\]\\:flex {
        display: flex;
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      .motion-safe\\:flex {
        display: flex;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .motion-reduce\\:flex {
        display: flex;
      }
    }

    @media (prefers-contrast: more) {
      .contrast-more\\:flex {
        display: flex;
      }
    }

    @media (prefers-contrast: less) {
      .contrast-less\\:flex {
        display: flex;
      }
    }

    @media (width >= 640px) {
      .sm\\:flex {
        display: flex;
      }
    }

    @media (width >= 768px) {
      .md\\:flex {
        display: flex;
      }
    }

    @media (width >= 1024px) {
      .lg\\:flex {
        display: flex;
      }
    }

    @media (width >= 1280px) {
      .xl\\:flex {
        display: flex;
      }
    }

    @media (width >= 1536px) {
      .\\32 xl\\:flex {
        display: flex;
      }
    }

    @media (orientation: portrait) {
      .portrait\\:flex {
        display: flex;
      }
    }

    @media (orientation: landscape) {
      .landscape\\:flex {
        display: flex;
      }
    }

    .ltr\\:flex:where([dir="ltr"], [dir="ltr"] *) {
      display: flex;
    }

    .rtl\\:flex:where([dir="rtl"], [dir="rtl"] *) {
      display: flex;
    }

    @media (prefers-color-scheme: dark) {
      .dark\\:flex {
        display: flex;
      }
    }

    @media print {
      .print\\:flex {
        display: flex;
      }
    }

    @media (forced-colors: active) {
      .forced-colors\\:flex {
        display: flex;
      }
    }

    .\\[\\&_p\\]\\:flex p {
      display: flex;
    }

    @supports (-moz-orient: inline) {
      @layer base {
        *, :before, :after, ::backdrop {
          --tw-content: "";
        }
      }
    }

    @property --tw-content {
      syntax: "*";
      inherits: false;
      initial-value: "";
    }"
  `)
})
