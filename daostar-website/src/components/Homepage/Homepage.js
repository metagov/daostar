import React from 'react';
import Typewriter from 'typewriter-effect';

// Homepage Graphics
import mesh from '../../img/mesh.png';
import hand from '../../img/hand_final.png';
import cube from '../../img/cube.png';
import metagovSVG from '../../img/metagov.svg';
import MemberLogos from './MemberLogos/MemberLogos';

import Eye from './Eye/Eye';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import REGISTRATIONS from '../ExplorePage/queries/registrations';
import RegistrationCard from '../RegistrationCard/RegistrationCard';
import { filterRegistrations } from '../ExplorePage/ExplorePage';
import './Homepage.css';

const Homepage = (props) => {

    const { loading, error, data } = useQuery(REGISTRATIONS);

    const daoCards = data ? (
            data.registrationInstances
                .filter(reg => filterRegistrations(reg))
                .filter((reg, i) => i < 2)
                .map((registration, i) => {
                    return (
                        <RegistrationCard 
                            key={i}
                            {...registration}
                        />
                    )
                })
            ) : null;

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
                                        strings: [ "Metagov", "Gnosis", "Moloch", "Aragon", "OpenZeppelin", "Compound", "DAOstack", "Colony", "Tribute" ],
                                        autoStart: true,
                                        loop: true,
                                        changeDeleteSpeed: 2000
                                    }}
                                />
                            </h1>
                            <div className="buttons">
                                <Link to='/register' className="btn primary">Upgrade your DAO</Link>
                                <Link to='/explore' className="btn">Explore the ecosystem</Link>
                            </div>
                        </div>
                    </section>

                    <section className='info-section' id='standard'>
                        <h2 className='space-mono font-700 no-transform'>
                            An API for your DAO
                        </h2>
                        <div className='info-container'>
                            <div className='main-content'>
                                <p>
                                    DAO* (or DAOstar) defines a common interface for DAOs, akin to 
                                    tokenURI for NFTs, so that DAOs of all shapes and sizes are easier 
                                    to discover, more legible to their members, and more compatible with future tooling.
                                </p><br/>
                                <p>Many DAOs already publish their data in various ways. We've standardized these 
                                    existing best-practices, making it easy for people to create and maintain new DAOs 
                                    and DAO tooling.
                                </p>
                            </div>
                            <div className='sidebar'>
                                <h3 className='space-mono font-700 no-transform'>
                                    Key Standards
                                </h3>
                                <a 
                                    href="https://eips.ethereum.org/EIPS/eip-4824" 
                                    target="_blank"
                                    className="btn"
                                >
                                    EIP-4824: Common Interfaces for DAOs
                                </a>
                                <a 
                                    href="#roundtable" 
                                    className="btn"
                                    target="_blank"
                                >
                                    Attestations for DAOs
                                </a>
                                <a 
                                    className="btn secondary"
                                    href="https://github.com/metagov/daostar/tree/main/DAOIPs" 
                                    target="_blank"
                                >
                                    Read on Github
                                </a>
                            </div>
                        </div>
                        <div className='info-container'>
                            {daoCards}
                        </div>
                        <Link to='/explore' className="btn">Explore DAOs</Link>
                    </section>

                    <Eye />
            
                    <section id="intro">
                        <h2 className='space-mono font-700 no-transform'>
                            The story so far...
                        </h2>
                        <div className="rows">
                            <div>					
                                <p>It is a period of creative turmoil. DAOs, or decentralized autonomous organizations, represent one possible future for the internet. But that future is fragile. Use-cases are immature. Speculation is rampant. The first DAO exploded, almost taking down Ethereum. DAOs are far, far from disrupting the deathstars of WEB2.</p>
                            </div>
                            <div>
                                <p>For years, the ecosystem was fragmented by competition. Now, a new alliance of DAO builders is racing to build standards that will realize the promise of this emerging technology...</p>
                            </div>
                        </div>
                    </section> 

                    <section className='info-section' id='build'>
                        <h2 className='space-mono font-700 no-transform'>
                            Contribute to standards
                        </h2>
                        <div className='quote'>
                            <p>💡 “Let’s challenge each other not to build empires.”</p>
                            <p className='quote-author'>
                                - Spencer Graham @ Roundtable #1
                            </p>
                        </div>
                        <div className='info-container'>
                            <div className='main-content'>
                                <p>
                                    DAOstar One is a roundtable of key organizations in the DAO ecosystem. We build interoperable standards and other public infrastructure for DAOs and DAO tooling.
                                </p><br/>
                                <p>
                                    Each roundtable meeting includes representatives from key organizations in the DAO ecosystem, and each organization can send up to two representatives per meeting. The private roundtable is regularly attended by DAO leaders, founders, and CEOs, and the discussions are professionally moderated and summarized. The roundtable meets monthly.
                                </p>
                            </div>
                            <div className='sidebar one-third'>
                                <div className='button-info-group'>
                                    <a 
                                        href="https://discord.com/invite/PdrPkEZVFk" 
                                        target="_blank"
                                        className="btn"
                                    >
                                        Join our Discord
                                    </a>
                                    <p>For questions and discussion, go to #daostar or #daostar-one.</p>
                                </div>
                                <div className='button-info-group'>
                                    <a 
                                        href="https://metagov.typeform.com/to/rnv3Uk3X" 
                                        className="btn"
                                        target="_blank"
                                    >
                                        Sign up for community call
                                    </a>
                                    <p>Every two weeks on Thursday, 11am ET.</p>
                                </div>
                                <div className='button-info-group'>
                                    <a 
                                        className="btn"
                                        href="https://daostar.one" 
                                        target="_blank"
                                    >
                                        Learn more
                                    </a>
                                    <p>Visit daostar.one for more information about joining the roundtable</p>
                                </div>
                            </div>
                        </div>
                    </section>
                
{/*                 
                    <section id="standard">
                        
                        <h2>The DAO Standard</h2>

                        <p>DAOstar defines a common interface for DAOs, akin to tokenURI for NFTs, so that DAOs of all shapes and sizes are easier to discover, more legible to their members, and more compatible with future tooling.</p> 
                        <p>Many DAOs already publish their data in various ways. We've standardized these existing best-practices, making it easy for people to create and maintain new DAOs and DAO tooling.</p>
                        <a href="https://daostar.one/EIP" className="btn">Read the standard</a>
                    </section> */}

                    {/* <section id="upgrade">
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
                            {/* <a href="https://github.com/metagov/daostar/gnosis" target="_blank"><img src="logos/gnosis.png" alt="Gnosis" /></a>
                            <a href="https://github.com/metagov/daostar/tree/main/Implementations" target="_blank"><img src={molochLogo} alt="Moloch" /></a>
                            <a href="https://github.com/metagov/daostar/tree/main/Implementations" target="_blank"><img src={daoStackLogo} alt="DAOstack" /></a>
                            <a href="https://github.com/metagov/daostar/tree/main/Implementations" target="_blank"><img src={compoundLogo} alt="Compound Governor Bravo" /></a>
                        </div>
                    </section> */}
                                                                                
                    {/* <section id="discussion">
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

                    </section> */}


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
