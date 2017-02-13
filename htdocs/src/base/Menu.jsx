import React from 'react';
import {Link} from 'react-router';

class Menu extends React.Component {
  componentDidMount() {
    let links = $('#top ul a');
    links.click((e) => {
      links.removeClass('active');
      $(e.target).addClass('active');
    });
  }

  render() {
    return(
      <div id="top" className="row">
        <div className="col-md-12">
          <Link to={'/'} className="logo"></Link>

          <ul>
            <div className="clear"></div>
            <li>
              <Link to={'/information'}>¿Qué es TS 2.0?</Link>
            </li>
            <li>
              <Link to={'/contracts'}>Contratos</Link>
            </li>
            <li>
              <Link to={'/indicators'}>Indicadores</Link>
            </li>
            <li>
              <Link to={'/register'}>Notificaciones</Link>
            </li>
            <li><a href="http://www.tm.org.mx" target="_blank">Contrataciones Abiertas</a></li>
          </ul>

          <div className="social">
            <a href="https://www.twitter.com/testigo_social" className="tw"></a>
            <a href="https://www.facebook.com/testigosocial" className="fb"></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
