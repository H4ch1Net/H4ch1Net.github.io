import './Reflection.css'

function Reflection() {
  return (
    <div className="crt-wrapper">
      <div className="crt-frame">
        <div className="crt-screen">
          <div className="scanlines"></div>
          <div className="vignette"></div>
          
          <header className="crt-header">
            <div className="header-left">entrepreneurship.log</div>
            <div className="header-right">
              <span className="status-dot">●</span> CONNECTED
            </div>
          </header>

          <main className="crt-content">
            {/* Intro Section */}
            <section className="intro-section">
              <div className="terminal-line">&gt; INIT COURSE_REFLECTION --mode=ENTREPRENEURSHIP</div>
              <div className="terminal-line">&gt; STATUS: completed</div>
              <div className="terminal-line">&gt; NOTE: started as "just another GE"; ended as a mindset shift.</div>
              <div className="terminal-line">&gt; DISPLAY top_10_lessons</div>
            </section>

            {/* Log Entries Section */}
            <section className="log-section">
              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 01]</span>
                  <span className="log-label">mindset</span>
                </div>
                <h2>Entrepreneurship is a mindset, not just a startup.</h2>
                <p>
                  I used to think entrepreneurship meant launching a business. Now I see it as a way of acting: spotting real needs, taking a step with the resources I have, learning from what happens, and adjusting. This applies to school, work, and my own life, even if I never file an LLC.
                </p>
              </article>

              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 02]</span>
                  <span className="log-label">iteration</span>
                </div>
                <h2>Small, simple steps beat perfect plans.</h2>
                <p>
                  I learned to stop waiting to "feel ready." This course pushed me to start small, do one action, watch what happens, and treat that as data for the next version. Progress is a series of small experiments, not one big moment.
                </p>
              </article>

              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 03]</span>
                  <span className="log-label">opportunity</span>
                </div>
                <h2>Problems are opportunities hiding in plain sight.</h2>
                <p>
                  I started noticing small frictions in everyday life: confusing apps, people scared of scams, messy processes at work. Instead of just being annoyed, I see them as starting points. My computer literacy idea grew from watching people struggle with privacy, scams, and basic device settings.
                </p>
              </article>

              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 04]</span>
                  <span className="log-label">grit</span>
                </div>
                <h2>Grit and persistence matter more than raw talent.</h2>
                <p>
                  The idea that grit beats talent showed up often. Stories like Kevin Hart's showed how consistent work over time matters more than being naturally gifted. Sticking with something through the boring and hard parts leads farther than relying on intelligence alone.
                </p>
              </article>

              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 05]</span>
                  <span className="log-label">reflection</span>
                </div>
                <h2>Reflection is a tool, not just homework.</h2>
                <p>
                  Weekly reflections forced me to slow down and analyze what I did. Writing about what worked, what failed, and why made my thinking clearer. Reflection turned vague "I'm stuck" moments into better decisions and next steps.
                </p>
              </article>

              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 06]</span>
                  <span className="log-label">simplicity</span>
                </div>
                <h2>Simplicity and "what works" beat fancy ideas.</h2>
                <p>
                  I used to care a lot about how ideas sounded. The course shifted my focus to whether they actually help people. Examples like the Embrace Infant Warmer showed that good solutions are often simple, affordable, and reliable, not flashy.
                </p>
              </article>

              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 07]</span>
                  <span className="log-label">creativity</span>
                </div>
                <h2>Creativity is everyday problem-solving, not just art.</h2>
                <p>
                  I still feel like a "level 1" in creativity, but now I define it differently. Creativity shows up in how I plan, communicate, and design processes. My plan is: short idea bursts, list three options before picking one, start with small changes, then check results. It is a skill I can train.
                </p>
              </article>

              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 08]</span>
                  <span className="log-label">teamwork</span>
                </div>
                <h2>Teamwork and communication multiply impact.</h2>
                <p>
                  Cross-functional teamwork showed me how much better ideas get when different perspectives collide. Simple, frequent updates and clear communication keep projects organized and lower stress. Trust and communication turn a group into a team that can execute.
                </p>
              </article>

              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 09]</span>
                  <span className="log-label">impact</span>
                </div>
                <h2>Social entrepreneurs and intrapreneurs change systems from different places.</h2>
                <p>
                  I learned the roles of social entrepreneurs, intrapreneurs, nonprofits, and not-for-profits. Social entrepreneurs use new ideas to fix real problems; intrapreneurs innovate inside existing organizations. This helped me see my computer literacy idea as something that could live as its own project or within a school or workplace.
                </p>
              </article>

              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-tag">[LOG 10]</span>
                  <span className="log-label">risk</span>
                </div>
                <h2>You do not have to be an expert to act, but you must manage risk.</h2>
                <p>
                  The TEDx story about people stepping up in an emergency showed that leadership often means acting before you feel fully qualified. In class we broke risk into demand, technology, execution, and financing. Small tests, staged effort, and clear stories help manage those risks. I do not need to know everything to start, but I do need to start intelligently.
                </p>
              </article>
            </section>

            {/* Application Section */}
            <section className="application-section">
              <h2 className="section-heading">&gt; APPLICATION: how I plan to use this</h2>
              <p>
                In the present, I am applying this mindset to my computer literacy idea. Instead of designing a full program in my head, I will:
              </p>
              <ul>
                <li>Talk to students, family, or coworkers about where they struggle with devices and online safety.</li>
                <li>Pick one small topic (for example, recognizing scams or basic privacy settings).</li>
                <li>Run a small test: a short guide, micro-workshop, or simple resource.</li>
                <li>Reflect on what worked, what confused people, and what needs to change.</li>
                <li>Iterate and repeat.</li>
              </ul>
              <p>
                Long term, as I work in IT and related fields, these lessons guide how I handle problems: stay calm when things break, communicate clearly, use small tests, and focus on simple solutions that actually help users.
              </p>
            </section>

            {/* Open Questions Section */}
            <section className="questions-section">
              <h2 className="section-heading">&gt; OPEN QUESTIONS: what remains unresolved</h2>
              <p>
                Even after the course, some questions stay active in the log:
              </p>
              <ul>
                <li>How do I balance risk and stability when I am responsible for supporting myself and my family?</li>
                <li>How do I decide which opportunities are worth pursuing and which are distractions?</li>
                <li>What is the best way to measure impact for a computer literacy project beyond attendance or clicks?</li>
                <li>How can I keep my grit and motivation strong over years, not just weeks or months?</li>
                <li>How do I bring an entrepreneurial mindset into future workplaces without always needing to be "the founder"?</li>
              </ul>
              <p>
                The course did not answer everything, but it changed the way I see problems, chances, and my own role in creating change. That shift is the real output of this log.
              </p>
            </section>

            {/* Outro Section */}
            <section className="outro-section">
              <div className="terminal-line">&gt; END LOG</div>
              <div className="terminal-line">&gt; RETURN mindset=ENTREPRENEURIAL</div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Reflection
