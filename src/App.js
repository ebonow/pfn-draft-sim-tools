import { useEffect, useState } from 'react';
import logo from "./images/draft.png";
import toggleOnImg from "./images/toggle-on.png";
import toggleOffImg from "./images/toggle-off.png";
import tradeImg from "./images/trade.png";
import renameImg from "./images/edit.png";

// eslint-disable-next-line import/no-webpack-loader-syntax
import file from '!raw-loader!./script.js';
// eslint-disable-next-line import/no-webpack-loader-syntax
import style from '!raw-loader!./style.css';

//const TEAMS = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LAC', 'LAR', 'LV', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS']

function App() {
  const [toggledImg, setToggledImg] = useState(0)

  const script = `javascript:${encodeURIComponent(`(function(){${file?.trim()}})();`)}`
  const bookmarkHref = script.replace('__CSS__', style)

  // const onChange = e => setTeam(e.target.value)

  useEffect(() => {
    const timer = setInterval(() => { setToggledImg(p => !p) }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>PFN Mock Draft Tools</h1>
        <small>
          because the best NFL draft simulation experience doesn't have to be
          behind a paywall...
        </small>
      </header>
      <main>
        <section>
          <h2>Description</h2>
          <p>
            NFL Mock Drafts can be a fun. You know what's not fun? Suddenly
            seeing your NFL GM fantasy playground locked behind a paywall. No
            fear though, PFN provides a free alternative. And while I have had
            fun with PFN's Draft Simulator, I can't help but feel there are some
            missing things, most importantly was a quick way to view my own
            draft picks, so I decided to write a bookmarklet to remedy that.
          </p>
        </section>
        <section>
          <h2>What does it do?</h2>
          <p>
            This script can be run as a bookmarklet (a bookmark that can add
            some code to a webpage) that when clicked during a PFN Mock Draft,
            will add a button called "MY PICKS". Clicking this button will then
            toggle the list picks between the board and those only for your team
            of choice.
          </p>
          <div>
            <img src={!toggledImg ? toggleOffImg : toggleOnImg} width="100%" alt="Screenshot" />
          </div>
          <div style={{ display: 'flex', margin: '2rem 0', alignItems: 'center', padding: '1rem', gap: '1rem', background: '#0756C2' }}>
            <div style={{ background: '#fff', alignSelf: 'normal', padding: '1rem' }}>
              <b>4/18/23 Update:</b>
              <div>Now all trades will also show the draft pick values assigned to each pick (per the Hill draft chart) as well as the underlying values assigned to each player by PFN.</div>
            </div>
            <img src={tradeImg} width="360" alt="Screenshot show trade values" />
          </div>
          <p>
            Finally, some styling optimizations have been made to make the results screen more readable.
          </p>
        </section>
        <section>
          <h2>How do I set it up?</h2>
          <ol>
            {/* <li>
              <div>
                <label htmlFor="teams">Choose a team: </label>
                <select name="teams" id="teams" onChange={onChange}>
                  {TEAMS.map((t) => (
                    <option value={t} children={t} key={t} />
                  ))}
                </select>
              </div>
            </li>

            {!!team && (
              <> */}
                <li>
                  <span>Drag this bookmarklet link into your browser toolbar: </span>
                  <a
                    className="bookmark"
                    href={bookmarkHref}
                  >{`PFN Draft Tool`}</a>
                </li>
                <li>
                  Right-click the link and select "Edit" and then change the
                  name to whatever you like (optional)

                  <div>
                    <img src={renameImg} width="240" alt="Rename bookmarklet" />
                  </div>
                </li>
                <li>
                  Start a mock draft and once it's begun, press the bookmarklet
                  link
                </li>
                <li>
                  <div>
                    A new button will show up saying "MY PICKS" which will allow
                    you toggle your view of picks for the team you selected
                  </div>
                  <div><br />
                    <b>NOTE: </b>You will need to reclick this bookmarklet link
                    everytime a new draft starts.
                  </div>
                </li>
              {/* </> */}
            {/* )} */}
          </ol>
        </section>

        <section>
          <h2>Todo</h2>
          <p>There are still a few things I would like to potentially do</p>
          <ul>
            <li className="todo">
              Better error detection for when draft screen is not active or for
              duplicate bookmarklet link presses
            </li>
            <li className="todo">Add support for multiple controlled teams.</li>
            <li className="todo">
              Automatically rerun the script when restarting a new draft.
            </li>
            <li className="todo">
              Show remaining picks numbers or selected positions near the
              button.
            </li>
            <li className="todo">
              Add styling of "MY PICKS" button when it is toggled on.
            </li>
            <li className="todo">
              Automatically scroll picks selection to show the current pick when
              toggling off "MY PICKS".
            </li>
            <li className="todo">Create this as a Chrome/Mozilla extension</li>
          </ul>
        </section>

        <section>
          <h2>Other future ideas for improvement</h2>
          <ul>
            <li className="todo">
              Highlight/select players on your board with ability to filter on
              those picks
            </li>
            <li className="todo">Show trade details on draft summary screen</li>
            <li className="todo">
              Find way to upload and use other big boards to add variety to
              drafts
            </li>
            <li className="todo">
              Find way to apply different big boards to different teams
            </li>
            <li className="todo">
              When viewing bios, find way to add links to other draft player
              ratings/articles
            </li>
            <li className="todo">
              Find way to preserve and auto-populate last trade attempt details
            </li>
            <li className="todo done">
              <span>Find way to show Hill trade values when proposing trades</span>
            </li>
            <li className="todo done">
              <span>Add styling to make draft results readable and easily more
              sharable</span>
            </li>
          </ul>
          <p>
            <b>NOTE: </b>I have no idea how possible these various things would
            be to implement and some would be larger undertakings than others.
            Also the draft is coming very soon.
          </p>
        </section>

        <section>
          <h2>Disclaimer</h2>
          <p>
            I am not responsible for the team at PFN changing their website in
            such a way that this no longer works as I am not affiliated with the
            fine folks there.
          </p>

          <p>
            Also as you may notice from my screenshots, I am using a custom
            stylesheet I wrote which allows me to see more of the screen. I
            might be willing to make this available as well, but am conflicted
            between enabling people to have a better UX and ultimately see the
            full list of draft results without scrolling vs promoting ways to
            hide their sponsors when <i>other sites</i> have instead opted for a
            paywall.
          </p>
        </section>

        <section>
          <h2>Thank you</h2>
          <p>
            A special thank you to PFN for their mock draft tool. Additionally,
            thank you all for using this. It's good to know something worthwhile
            is contributed even if it is a silly hobby. I truly apprecaite any
            feedback. Most of all, happy drafting!
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
