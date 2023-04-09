const TEAM = 'CHI';
let toggledOn = false;

const toggleMyPicks = (team) => {
  toggledOn = !toggledOn;

  const picks = document.getElementById('draft-order-list-container').getElementsByClassName('draft-card')

  const isMyPick = p => (p.firstChild.firstChild.alt === team);
  for (const p of picks) {
    p.style.display = (toggledOn && !isMyPick(p)) ? 'none' : 'flex';
  }
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

const c = document.getElementById('sim-management-buttons');
c.prepend(b);