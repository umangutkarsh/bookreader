import { Selector } from 'testcafe';
import BookReader from './models/BookReader';

const { BASE_URL } = process.env;

fixture `Viewmode carousel`.page `${BASE_URL}viewmode-cycle.html`;

test('Clicking `view mode` cycles through view modes', async t => {
  const { nav } = (new BookReader());

  // viewmode button only appear on mobile devices
  await t.resizeWindow(400, 100)

  // 2up to thumb
  await t.click(nav.desktop.viewmode);
  const thumbnailContainer = Selector('.BRmodeThumb');
  await t.expect(thumbnailContainer.visible).ok();
  const thumbImages = thumbnailContainer.find('.BRpageview img');
  await t.expect(thumbImages.count).gt(0);

  // thumb to 1up
  await t.click(nav.desktop.viewmode);
  const onePageViewContainer = Selector('.BRpageview');
  await t.expect(onePageViewContainer.visible).ok();
  const onePageImages = onePageViewContainer.find('.BRpagecontainer.BRmode1up');
  // we usually pre-fetch the page in question & the 2 after it
  await t.expect(onePageImages.count).gte(3);

  // 1up to 2up
  await t.click(nav.desktop.viewmode);
  const twoPageContainer = Selector('.BRtwopageview');
  await t.expect(twoPageContainer.visible).ok();
  const twoPageImages = twoPageContainer.find('img.BRpageimage');
  await t.expect(twoPageImages.count).eql(2);
});
