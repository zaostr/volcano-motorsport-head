import { storiesOf } from '@storybook/vue'

import Notes from './SearchInput.md'

import SearchInput from './SearchInput'

storiesOf('Controls', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Search Input',
    () => ({
      components: { SearchInput },
      template: `
        <search-input />`
    }),
    {
      info: {
        summary:
          'Search input component.<br><br>' +
          '<b>Location:</b> ./components/molecules/SearchInput.vue'
      }
    }
  )
