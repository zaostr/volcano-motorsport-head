import { storiesOf } from '@storybook/vue'

import Notes from './MenuMain.md'

import MainMenu from './MenuMain'

storiesOf('Menus', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Main menu',
    () => ({
      components: { MainMenu },
      data() {
        return {
          itemsList: [
            { text: 'Item 1', routeName: 'route-name-1' },
            { text: 'Item 2', routeName: 'route-name-2' },
            { text: 'Item 3', routeName: 'route-name-3' },
            { text: 'Item 4', routeName: 'route-name-4' },
            { text: 'Item 5', routeName: 'route-name-5' }
          ]
        }
      },
      template: `
        <main-menu :itemsList="itemsList"/>`
    }),
    {
      info: {
        summary:
          'Main menu component.<br><br>' +
          '<b>Location:</b> ./components/molecules/MenuMain.vue'
      }
    }
  )
