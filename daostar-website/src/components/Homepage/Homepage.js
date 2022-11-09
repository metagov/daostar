import React from 'react';
import Typewriter from 'typewriter-effect';

// Homepage Graphics
import mesh from '../../img/mesh.svg';
import hand from '../../img/hand_final.png';
import cube from '../../img/cube.png';
import metagovSVG from '../../img/metagov.svg';
import MemberLogos from './MemberLogos/MemberLogos';

import molochLogo from '../../img/logos/moloch.jpeg';
import daoStackLogo from '../../img/logos/daostack.jpeg';
import compoundLogo from '../../img/logos/compound.png';

const Homepage = (props) => {

    return (
        <div>				
            <div className="parallax--wrapper">
                <div id="mesh" className="parallax parallax--minus2"><img src={mesh}/></div>
                <div id="hand" className="parallax parallax--minus1"><img src={hand} /></div>

                <div className="wrapper parallax parallax-base">
                    <section id="title">
                        <div>
                            <h1 className="title">
                                The DAO standard,<br />
                                <span>built by </span>
                                <Typewriter 
                                    options={{
                                        strings: [ "Metagov", "Gnosis", "Moloch", "Aragon", "Compound", "DAOstack", "Colony", "Tribute", "OpenZeppelin" ],
                                        autoStart: true,
                                        loop: true,
                                        changeDeleteSpeed: 2000
                                    }}
                                />
                            </h1>
                            <div className="buttons">
                                <a href="#standard" className="btn">Standard</a>
                                <a href="#roundtable" className="btn">Roundtable</a>
                            </div>
                        </div>
                    </section>
            
                    <div id="container">
                        <canvas id="canvas3d"></canvas>
                    </div>

                    <section id="intro" className="rows">
                        <h3>The story so far...</h3>
                        
                        <div>					
                            <p>It is a period of creative turmoil. DAOs, or decentralized autonomous organizations, represent one possible future for the internet. But that future is fragile. Use-cases are immature. Speculation is rampant. The first DAO exploded, almost taking down Ethereum. DAOs are far, far from disrupting the deathstars of WEB2.</p>
                        </div>
                        <div>
                            <p>For years, the ecosystem was fragmented by competition. Now, a new alliance of DAO builders is racing to build standards that will realize the promise of this emerging technology...</p>
                        </div>
                    </section> 
                
                
                    <section id="standard">
                        <h2>The DAO Standard</h2>

                        <p>DAOstar defines a common interface for DAOs, akin to tokenURI for NFTs, so that DAOs of all shapes and sizes are easier to discover, more legible to their members, and more compatible with future tooling.</p> 
                        <p>Many DAOs already publish their data in various ways. We've standardized these existing best-practices, making it easy for people to create and maintain new DAOs and DAO tooling.</p>
                        <a href="https://daostar.one/EIP" className="btn">Read the standard</a>
                    </section>

                    <section id="upgrade">
                        <h2>Upgrade</h2>

                        <div className="rows">
                            <div>
                                <a href="/api/create" className="btn">Create Endpoint (alpha)</a>

                                <p className="small">You can create a DAOstar endpoint here or set up your own.</p>
                            </div>
                            <div>
                                <a href="/api" className="btn">Explore Endpoints (alpha)</a>

                                <p className="small">You can explore existing endpoints here.</p>
                            </div>
                            <div>
                                <span className="btn inactive">Upgrade Contract</span>
                                <p className="small">We do not recommend modifying your contract until the standard is finalized.</p>
                            </div>
                        </div>

                        <h3>Sample Implementations</h3>

                        <div className="logos">
                            {/* <a href="https://github.com/metagov/daostar/gnosis" target="_blank"><img src="logos/gnosis.png" alt="Gnosis" /></a> */}
                            <a href="https://github.com/metagov/daostar/tree/main/Implementations" target="_blank"><img src={molochLogo} alt="Moloch" /></a>
                            <a href="https://github.com/metagov/daostar/tree/main/Implementations" target="_blank"><img src={daoStackLogo} alt="DAOstack" /></a>
                            <a href="https://github.com/metagov/daostar/tree/main/Implementations" target="_blank"><img src={compoundLogo} alt="Compound Governor Bravo" /></a>
                        </div>
                    </section>
                                                                                
                    <section id="discussion">
                        <h2>Join the discussion</h2>

                        <div>
                            <p>Have questions about upgrading? Come join our Discord or sign up for one of the upcoming community calls.</p>
                        </div>

                        <div className="rows">
                            <div>
                                <a href="https://discord.gg/PdrPkEZVFk" className="btn">Join our Discord</a>
                                <p className="small">For questions and discussion, go to #daostar or #daostar-one.</p>
                            </div>
                            <div>
                                <a href="https://metagov.typeform.com/to/rnv3Uk3X" className="btn">Sign Up for Community Call</a>
                                <p className="small">Every two weeks on Thursday, 11am ET. Next calls: May 19, June 2, June 16.</p>
                            </div>
                        </div>

                    </section>


                    <section id="roundtable">
                        <h2>Governed by DAOstar One</h2>
                        <p><a href="https://daostar.one">DAOstar One</a> is a roundtable of key organizations in the DAO ecosystem.</p>
                        <MemberLogos />
                    </section>

                    <footer>
                        <div className="bottom">
                            <div className="logo">
                                Hosted by <a href="https://metagov.org" target="_blank"><img src={metagovSVG} alt="Metagovernance Project" height="48px" /> Metagov</a>
                            </div>

                            <div className="credits">
                                <p className="small">Site by <a href="https://jennyfan.com" target="_blank">Jenny Fan</a>, illustrations by <a href="https://www.instagram.com/hirsch_joe/" target="_blank">Joe Hirsch</a></p>
                            </div>

                            <div className="right">
                                <a href="https://discord.gg/PdrPkEZVFk" target="_blank">Discord</a>
                                <a href="https://twitter.com/DAOstar_One" target="_blank">Twitter</a>
                            </div>
                            
                        </div>


                        <img src={cube} className="cube" alt='Cube' />
                    </footer>
                </div>

            </div>

        </div>
    )
}

export default Homepage;