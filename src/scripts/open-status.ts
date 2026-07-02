import { getOpenStatus } from '../lib/hours';
import { site } from '../data/site';

function update() {
  const status = getOpenStatus(site.hours, site.timezone);
  document.querySelectorAll<HTMLElement>('[data-open-status-pill]').forEach((el) => {
    const textEl = el.querySelector<HTMLElement>('[data-open-status-text]') ?? el;
    textEl.textContent = status.label;
    el.classList.toggle('is-open', status.isOpen);
    el.classList.toggle('is-closed', !status.isOpen);
  });
}

update();
setInterval(update, 60_000);
