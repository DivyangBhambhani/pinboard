import React from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Landing extends React.Component {
	render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (this.props.isAuthed === true) {
            return (from.pathname == "/") ? <Redirect to="/home" /> : <Redirect to={from} />
        }
		return(
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark nav-bg-blue mainmenu-area affix-top menu2" data-spy="affix" data-offset-top="200">
					<div className="container">
		            	<Link className="navbar-brand" to="/">
		            		<h3 className="text-white title mt-2 display-4">
		                		<span className="font-weight-bold border-left-0 border-right-0 border-top-0 border-bold border-white">Pin</span>Board.
		                	</h3>
		            	</Link>
		                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainmenu" aria-controls="#mainmenu" aria-expanded="false" aria-label="Toggle navigation">
						    <span className="navbar-toggler-icon"></span>
						</button>
			            <div className="collapse navbar-collapse flex-grow-0" id="mainmenu">
			                <ul className="nav navbar-nav mr-auto navbar-item-white">
			                    <li className="nav-item"><Link className="nav-link pl-0" to="#home-page">Home</Link></li>
			                    <li className="nav-item"><Link className="nav-link pl-0" to="#feature-page">Features</Link></li>
			                    <li className="nav-item"><Link className="nav-link pl-0" to="#faq-page">FAQ</Link></li>
                            </ul>
                            { this.props.isAuthed === false && 
                                <div className=" mr-auto padding-left-50  my-2 my-lg-0">
                                    <Link to="/login" className="bttn-1 my-2 my-sm-0">Sign In</Link>
                                </div>
                            }
			            </div>
			        </div>
			    </nav>
			    <header id="home-page" className="header-area text-white xs-center v2">
			    	<div className="table-cell">
			            <div className="container">
			                <div className="row middle-row">
			                    <div className="col-xs-12 col-md-5">
			                        <h3 className="heading-3 text-white wow fadeInUp" data-wow-delay="0.2s" title="Shopping, Selling buying in one Software." style={{'visibility': 'visible', 'animationDelay': 0.2+'s', 'animationName': 'fadeInUp'}} >Shopping, Selling buying in one Software.</h3>
			                        <p className="wow fadeInUp" data-wow-delay="0.4s" style={{'visibility': 'visible', 'animationDelay': 0.4+'s', 'animationName': 'fadeInUp'}}>As companies move their business operations to the Internet, new data trails are created.</p>
			                        <div className="space-30"></div>
			                        <Link to="#" className="bttn-4 wow fadeInUp" data-wow-delay="0.6s" style={{'visibility': 'visible', 'animationDelay': 0.6+'s', 'animationName': 'fadeInUp'}}>Get Started for free</Link>
			                        <div className="space-60 hidden visible-xs visible-sm"></div>
			                    </div>
			                    <div className="hidden-xs col-md-6 offset-md-1">
			                        <figure className="single-image wow fadeInRight" style={{'visibility': 'visible', 'animationName': 'fadeInRight'}}>
			                            <img src="img/isomatric-1.png" alt="Laptop" />
			                        </figure>
			                    </div>
			                </div>
			            </div>
			        </div>
                </header>
                <section className="section-padding-top" id="service-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-6 offset-sm-2 offset-md-3 text-center">
                                <div className="page-title">
                                    <h4 className="heading-4 title purple">Why Choose Us</h4>
                                    <p>Turn emails, support tickets, chats, social media, surveys and documents into actionable data. </p>
                                </div>
                                <div className="space-80"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-4">
                                <div className="single-service wow zoomIn" data-wow-delay="0.3s" >
                                    <div className="service-icon">
                                        <img src="img/service-icon-2-1.png" alt="Service Icon" />
                                    </div>
                                    <h4 className="title">Fast and optimized</h4>
                                    <p>Unlike team chat apps, Flow is designed to help your team stay focused by keeping relevant and actionable.</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <div className="single-service wow zoomIn" data-wow-delay="0.3s" >
                                    <div className="service-icon">
                                        <img src="img/service-icon-2-2.png" alt="Service Icon" />
                                    </div>
                                    <h4 className="title">Well Documented</h4>
                                    <p>Unlike team chat apps, Flow is designed to help your team stay focused by keeping relevant and actionable.</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <div className="single-service wow zoomIn" data-wow-delay="0.3s" >
                                    <div className="service-icon">
                                        <img src="img/service-icon-2-3.png" alt="Service Icon" />
                                    </div>
                                    <h4 className="title">Easy Integration</h4>
                                    <p>Unlike team chat apps, Flow is designed to help your team stay focused by keeping relevant and actionable.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-padding-top" style={{ backgroundImage: `url(${'img/section-bg-4.png'})`, backgroundPosition: 'right center', backgroundSize: '60% auto'}}>
                    <div className="container">
                        <div className="row middle-row">
                            <div className="col-xs-12 col-md-5 wow fadeInLeft">
                                <h4 className="heading-4">Increase conversions and sales</h4>
                                <p>Discover where each customer came from, how they interact with your marketing channels, and gain deeper insights into what drives them to purchase.a</p>
                                <div className="space-15"></div>
                                <a href="#" className="bttn-4">Read More</a>
                                <div className="space-60 hidden visible-xs visible-sm"></div>
                            </div>
                            <div className="col-xs-12 col-md-6 offset-md-1 wow fadeInRight">
                                <figure className="wow">
                                    <img src="img/isomatric-2.png" alt="deshbord" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-padding" style={{backgroundImage: `url(${'img/section-bg-5.png'})`, backgroundSize: '60% auto', backgroundPosition: 'bottom left'}}>
                    <div className="container">
                        <div className="row middle-row">
                            <div className="col-xs-12 col-md-7 wow fadeInRight">
                                <figure className="wow">
                                    <img src="img/isomatric-3.png" alt="deshbord" />
                                </figure>
                                <div className="space-60 hidden visible-xs visible-sm"></div>
                            </div>
                            <div className="col-xs-12 col-md-5 wow fadeInLeft">
                                <h6 className="upper text-blue">Project Schedules</h6>
                                <h4 className="heading-4">Easily balance workloads and manage resources</h4>
                                <p>Plan ahead by day, week, or month, and see project status at a glance. Search and filter to focus in on anything form a single project to an individual person's workload.</p>
                                <div className="space-15"></div>
                                <a href="#" className="bttn-4">Read More</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="feature-page" className="section-padding" style={{backgroundImage: `url(${'img/section-bg-2.png'})`, backgroundPosition: 'center center', backgroundSize: '100% 100%'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-6 offset-sm-2 offset-md-3 text-center">
                                <div className="page-title">
                                    <h4 className="heading-4 title purple">Benefits of PinBoard</h4>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many, or as few, as you want.</p>
                                </div>
                                <div className="space-80"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="single-feature v2 wow fadeInRight" data-wow-delay="0.3s">
                                    <div className="feature-icon">
                                        <img src="img/feature-icon-2-1.png" alt="Easy Intregration" />
                                    </div>
                                    <h5>Easy Intregration</h5>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many,</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="single-feature v2 wow fadeInRight" data-wow-delay="0.4s">
                                    <div className="feature-icon">
                                        <img src="img/feature-icon-2-2.png" alt="Easy Intregration" />
                                    </div>
                                    <h5>Latest Technology</h5>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many,</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="single-feature v2 wow fadeInRight" data-wow-delay="0.5s">
                                    <div className="feature-icon">
                                        <img src="img/feature-icon-2-3.png" alt="Easy Intregration" />
                                    </div>
                                    <h5>Cloud Service</h5>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many,</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="single-feature v2 wow fadeInRight" data-wow-delay="0.6s">
                                    <div className="feature-icon">
                                        <img src="img/feature-icon-2-4.png" alt="Easy Intregration" />
                                    </div>
                                    <h5>Team Collaboration</h5>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many,</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="single-feature v2 wow fadeInRight" data-wow-delay="0.7s">
                                    <div className="feature-icon">
                                        <img src="img/feature-icon-2-5.png" alt="Easy Intregration" />
                                    </div>
                                    <h5>Multiple Post Selection</h5>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many,</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="single-feature v2 wow fadeInRight" data-wow-delay="0.8s">
                                    <div className="feature-icon">
                                        <img src="img/feature-icon-2-6.png" alt="Easy Intregration" />
                                    </div>
                                    <h5>User Permissions</h5>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many,</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="single-feature v2 wow fadeInRight" data-wow-delay="0.9s">
                                    <div className="feature-icon">
                                        <img src="img/feature-icon-2-7.png" alt="Easy Intregration" />
                                    </div>
                                    <h5>Unlimited Invoice</h5>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many,</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="single-feature v2 wow fadeInRight" data-wow-delay="1s">
                                    <div className="feature-icon">
                                        <img src="img/feature-icon-2-8.png" alt="Easy Intregration" />
                                    </div>
                                    <h5>Customer Support</h5>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many,</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-padding-top" id="faq-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-6 offset-sm-2 offset-md-3 text-center">
                                <div className="page-title">
                                    <h4 className="heading-4 title purple">Frequently asked questions</h4>
                                    <p>Notifications keep you informed of all updates. Customize them to receive as many, or as few, as you want.</p>
                                </div>
                                <div className="space-80"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <div className="faq-box">
                                    <h4 className="title">If you could time travel, what would you do?</h4>
                                    <p>As of the moment, we only have PayPal as our payment method. But don’t worry, we are working on adding more payment methods for your convenience for any problem.</p>
                                </div>
                                <div className="faq-box">
                                    <h4 className="title">What is your favorite fruit?</h4>
                                    <p>No, we do not need your password. We only need your username to be able to deliver your desired likes.</p>
                                </div>
                                <div className="faq-box">
                                    <h4 className="title">Which do you like better, cardio or weightlifting?</h4>
                                    <p>We give discounts for multiple accounts, namely: 2 accounts - 10% , 5 accounts - 25% ,10 accounts - 30%. For 50 more accounts, please contact us.</p>
                                </div>
                                <div className="faq-box">
                                    <h4 className="title">If you could have any kind of pet, what would you choose?</h4>
                                    <p>No, your account will remain safe because we offer real likes from real people. Our likes do not come from bots and ghost accounts.</p>
                                </div>
                                <div className="faq-box">
                                    <h4 className="title">Where did you get your name?</h4>
                                    <p>We only provide likes as of the moment. If in the future, we would be able to offer other services, we would definitely let you know.</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="faq-box">
                                    <h4 className="title">Which do you like better, city or country?</h4>
                                    <p>Yes, we offer automatic likes with various features that you can utilize such as Delay on Likes, Country and Gender Targeting, and Likes Randomness. </p>
                                </div>
                                <div className="faq-box">
                                    <h4 className="title">What is your favorite comedy?</h4>
                                    <p>Absolutely. We offer 50 free likes for you to be able to ascertain whether our service is for you.</p>
                                </div>
                                <div className="faq-box">
                                    <h4 className="title">If you could have any kind of pet, what would you choose?</h4>
                                    <p>We actually have an exchange nev2rk, and they have allowed us to like the posts of others.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer-area v2">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 offset-sm-3 text-center text-white">
                                <h3 className="heading-3 text-white">Join our community of 250.000+ users</h3>
                                <p>Sign up for a 15-day trial. No obligations. No credit card required.</p>
                                <form id="mc-form" className="subscrie-form v2">
                                    <button type="submit" className="submit">Get Started for free</button>
                                </form>
                                <div className="space-60"></div>
                                <div className="copyright">&copy; 2019 PinBoard. All rights reserved.</div>
                            </div>
                        </div>
                    </div>
                </footer>
			</div>
		)
	}
}

export default Landing;