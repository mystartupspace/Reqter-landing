import React, { Component } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import ContextApi from "../../components/ContextApi/ContextApi";
import classnames from "classnames";
class Footer extends Component {
  static contextType = ContextApi;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    this.translate = require(`./_locales/${this.context.lang}.json`);
    const { locale } = this.translate;
    return (
      <footer
        className={classnames("contact-info-box", `_${locale.direction}`)}
      >
        <section className="footer-links">
          <div className="column">
            <h6>{locale.products._title}</h6>
            <ul>
              <li>
                <Link to="/apply/sessionroom">
                  {locale.products.session_room}
                </Link>
              </li>
              <li>
                <Link to="/apply/shareddesk">
                  {locale.products.shared_desk}
                </Link>
              </li>
              <li>
                <Link to="/apply/privatedesk">
                  {locale.products.private_desk}
                </Link>
              </li>
              <li>
                <Link to="/apply/dedicatedoffice">
                  {locale.products.dedicated_office}
                </Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h6>{locale.support._title}</h6>
            <ul>
              <li>
                <Link to="/faq">{locale.support.faq}</Link>
              </li>
              <li>
                <Link to="/comingsoon">{locale.support.security}</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h6>{locale.partnership._title}</h6>
            <ul>
              <li>
                <Link to="/comingsoon">{locale.partnership.blog}</Link>
              </li>
              <li>
                <Link to="/comingsoon">{locale.partnership.job_positions}</Link>
              </li>
              <li>
                <Link to="/comingsoon">{locale.partnership.news}</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h6>{locale.buisness_partners._title}</h6>
            <ul>
              <li>
                <Link to="/partnership">
                  {locale.buisness_partners.request_partnership}
                </Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h6>{locale.rules._title}</h6>
            <ul>
              <li>
                <Link to="/comingsoon">{locale.rules.terms_of_use}</Link>
              </li>
              <li>
                <Link to="/comingsoon">{locale.rules.privacy_policy}</Link>
              </li>
            </ul>
          </div>
        </section>
        <section className="copyright">
          <span style={{ float: "right" }}>© 2019 Startup Space</span>
          <span style={{ float: "left", marginTop: "-15px" }}>
            <span className="followus-text"> {locale.social.follow_us}</span>
            <div className="footer-social-links">
              <a
                href="https://www.instagram.com/startupspace_hub/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} color="white" />
              </a>
              <a
                href="https://www.linkedin.com/company/startup-space/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedinIn} color="white" />
              </a>
            </div>
          </span>
          <br />
          <hr style={{ margin: 0, borderColor: "lightgrey" }} />
          <span style={{ float: "right" }}>{locale.copyright._title}</span>
        </section>
      </footer>
    );
  }
}

export default Footer;
