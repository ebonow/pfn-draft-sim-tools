const gid = id => document.getElementById(id);

const findReactComponent = function(id) {
  const el = gid('container') || {};
  for (const key in el) {
    if (key.startsWith('__reactInternalInstance$')) {
      const fiberNode = el[key];
      return fiberNode && fiberNode.return && fiberNode.return.stateNode;
    }
  }
  return null;
};

const component = findReactComponent();

const TEAM = component?.state.userTeams[0]?.shortName || 'CHI';

let toggledOn = false;

const toggleMyPicks = (team) => {
  toggledOn = !toggledOn;

  const picks = gid('draft-order-list-container').getElementsByClassName('draft-card')

  const isMyPick = p => (p.firstChild.firstChild.alt === team);
  for (const p of picks) {
    p.style.display = (toggledOn && !isMyPick(p)) ? 'none' : 'flex';
  }
}

const tallyPickValues = () => {
  const packages = gid('combined-picks-to-trade').querySelectorAll('.picks-to-trade-div');
  const ratio = x => Number.parseFloat(x * 100 - 100).toFixed(2);
  const setRatio = (el, max, min) => {
    if (max && min) { 
      el.setAttribute('data-package-ratio', `+${ratio(max/min)}%`);
    }
  }
  let tallies = [];
  packages.forEach(p => {
    let tally = 0;
    const picks = p.querySelectorAll(':checked');
    picks.forEach(pick => {
      tally += Number(pick.parentNode.getAttribute('data-value'));
    })
    p.setAttribute('data-package-value', tally);
    p.setAttribute('data-package-ratio', '');
    tallies.push(tally);
  });

  const [t1, t2] = tallies;
  if (t1 && t2 && t1 < t2) {
    setRatio(packages[0], t2, t1);
  } else if (t1 && t2 && t2 < t1) {
    setRatio(packages[1], t1, t2);
  }
}

const revealPickValues = () => {
  const { allPicksNFL } = component.state;
  const picks = gid('combined-picks-to-trade');
  picks.querySelectorAll('[type="checkbox"]').forEach(pick => {
    const txt = pick.parentElement.innerText;
    const [txt1, txt2] = txt.split(' ');
    const value = (!isNaN(txt) 
      ? allPicksNFL.find(x => x.number === Number(txt)) 
      : allPicksNFL.find(x => x.futureOriginalTeam === txt1 && x.futureRound === txt2)
    )?.value;

    pick.parentNode.setAttribute('data-value', value);
  })

  picks.addEventListener('change', tallyPickValues);
}

const injectStyle = () => {
  const style = document.createElement("style");
  style.textContent = `__CSS__`;
  document.body.after(style);
}

const i = document.createElement('img');
i.style.filter = 'invert(1)';
i.src = "/mockdraft/sim-control-icons/scouting-report-icon.png";

const p = document.createElement('p');
p.innerText = 'MY PICKS';

const b = document.createElement('button');
b.classList.add('sim-management-button-div');
b.addEventListener("click", () => toggleMyPicks(TEAM), false);
b.appendChild(i);
b.appendChild(p);

const c = gid('sim-management-buttons');
c.prepend(b);

const toCurry = component.revealTradePicks;
component.revealTradePicks = () => {
  toCurry();
  setTimeout(() => {
    revealPickValues();
    tallyPickValues();
  }, 100)
}

injectStyle();