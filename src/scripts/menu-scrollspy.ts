export {};

function init() {
  const nav = document.getElementById('menu-category-nav');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const sections = links
    .map((link) => document.getElementById(link.getAttribute('href')!.slice(1)))
    .filter((el): el is HTMLElement => el !== null);

  if (sections.length === 0) return;

  const setActive = (id: string) => {
    for (const link of links) {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
        link.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        setActive(visible[0].target.id);
      }
    },
    { rootMargin: '-140px 0px -60% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

init();
