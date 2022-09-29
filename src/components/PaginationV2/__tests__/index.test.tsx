import userEvent from '@testing-library/user-event'
import Pagination from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Pagination', () => {
  test('should render correctly', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        page={1}
        onChange={() => {}}
        pageCount={5}
        pageTabCount={5}
      />,
    ))

  test('should render correctly with pageCount is 1', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination page={1} onChange={() => {}} pageCount={1} />,
    ))

  test('should render correctly component with pageTabCount', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageTabCount={3}
        page={5}
        pageCount={10}
        onChange={() => {}}
      />,
    ))

  test('should render correctly component with disabled', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageTabCount={3}
        page={5}
        pageCount={10}
        onChange={() => {}}
        disabled
      />,
    ))

  test('should render correctly component with disabled', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageTabCount={3}
        page={5}
        pageCount={10}
        onChange={() => {}}
        disabled
      />,
    ))

  test('should render correctly with pageClick', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination page={2} pageCount={10} onChange={() => {}} />,
      {
        transform: node => {
          const nextButton = node.getByRole('button', { name: 'Next' })
          const backButton = node.getByRole('button', { name: 'Back' })
          const firstButton = node.getByRole('button', { name: 'First' })
          const lastButton = node.getByRole('button', { name: 'Last' })
          userEvent.click(nextButton)
          userEvent.click(backButton)
          userEvent.click(lastButton)
          userEvent.click(firstButton)
          const page3Button = node.getByRole('button', { name: 'Page 3' })
          userEvent.click(page3Button)
          userEvent.click(page3Button)
          const page4Button = node.getByRole('button', { name: 'Page 4' })
          userEvent.click(page4Button)
        },
      },
    ))
})