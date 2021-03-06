import React from 'react';
import {
  formatAmount,
  formatDate,
  codeList
} from '../helpers.js';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    let bullets = $('div.contract-header div.bullets a');
    bullets.on( 'click', function( e ) {
      e.preventDefault();
      let target = $(e.target);

      if( !target.hasClass('disabled') ) {
        target.tab('show');
        bullets.removeClass('active');
        target.addClass('active');
      }
    });
  }

  onClose(e) {
    e.preventDefault();
    this.props.onClose();
  }

  render() {
    let release = this.props.contract.releases[0];
    return (
      <div className="inner-row contract-details">
        {/* Header */}
        <div className="row contract-header">
          <div className="col-md-12">
            <div>
              {/* Title */}
              <div className="bg-gray">
                <h2 className="block-title">{release.tender.title}</h2>
                <h3>{formatAmount( release.tender.value.amount || 0 )}</h3>
                <p>{release.tender.description}</p>
                <a onClick={this.onClose} className='btn-black active'>Volver al listado de Resultados</a>
              </div>

              {/* Section tabs */}
              <div className="bullets">
                <a href="#planning"
                  className={release.planning ? 'btn-black active' : 'btn-black disabled'}>Planeación</a>
                <a href="#tender"
                  className={release.tender ? 'btn-black' : 'btn-black disabled'}>Licitación</a>
                <a href="#award"
                  className={release.awards ? 'btn-black' : 'btn-black disabled'}>Adjudicación</a>
                <a href="#contract"
                  className={release.contracts ? 'btn-black' : 'btn-black disabled'}>Contratación</a>
                <a href="#implementation"
                  className={release.implementation ? 'btn-black' : 'btn-black disabled'}>Implementación</a>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="tab-content">
          {/* Planning */}
          <div role="tabpanel" className="tab-pane active fade in" id="planning">
            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Fuente Presupuestaria</p>
                <h4>{release.planning.budget.source}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Identificador del Presupuesto</p>
                <h4>{release.planning.budget.id}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Monto Asignado</p>
                <h4>{formatAmount(release.planning.budget.amount.amount || 0)}</h4>
              </div>
            </div>

            <div className="row border-bottom">
              <div className="col-md-12">
                <p className="lbl">Fundamento</p>
                <p className="txt-bold">{release.planning.budget.description}</p>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">¿Proyecto Plurianual?</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Proyecto Presupuestario</p>
                <h4>{release.planning.budget.project}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Identificador</p>
                <h4>{this.props.contract.releases[0].planning.budget.projectID}</h4>
              </div>
            </div>

            <div className="row border-bottom">
              <div className="col-md-12">
                <p className="lbl">Enlace a la información presupuestaria</p>
                <a href={this.props.contract.releases[0].planning.budget.uri}>
                  {this.props.contract.releases[0].planning.budget.uri}
                </a>
              </div>
            </div>
          </div>

          {/* Tender */}
          <div role="tabpanel" className="tab-pane fade" id="tender">
            <div className="row contract-highlights border-bottom">
              <div className="col-md-8">
                <p className="lbl">Título de la Licitación</p>
                <h4>{release.tender.title}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Identificador de la Licitación</p>
                <h4>{release.tender.id}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Tipo de Contratación</p>
                <h4>{release.tender.metodoDeAdquisicion}</h4>
              </div>
              <div className="col-md-8">
                <p className="lbl">Descripción de la Licitación</p>
                <h4>{release.tender.description}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Estatus de la Licitación</p>
                <h4>{codeList('tender.status', release.tender.status)}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Valor Máximo</p>
                <h4>{formatAmount(release.tender.value.amount || 0)}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Método por el que se realiza</p>
                <h4>{codeList('tender.procurementMethod', release.tender.procurementMethod)}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Cáracter del Proceso</p>
                <h4>
                  {release.tender.submissionMethod ? release.tender.submissionMethod.join(',') : '-'}
                </h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Forma del Proceso</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Criterio de Adjudicación</p>
                <h4>{release.tender.procurementMethodRationale}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Periodo de Recepción de Propuestas</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Periodo de Aclaraciones</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Aclaraciones</p>
                <h4>{'No disponible'}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Testigo Social</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-8">
                <p className="lbl">Criterio de Elegibilidad</p>
                <p className="txt-bold">{release.tender.awardCriteria}</p>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">No. de Propuestas Recibidas</p>
                <h4>{release.tender.numberOfTenderers}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Fecha de Adjudicación</p>
                <h4>{formatDate(release.date, 'DD/MM/YYYY')}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Identificador de Entidad</p>
                <h4>{this.props.contract.publisher.uid}</h4>
              </div>
            </div>
          </div>

          {/* Award */}
          <div role="tabpanel" className="tab-pane fade" id="award">
            <div className="row contract-highlights border-bottom">
              <div className="col-md-8">
                <p className="lbl">Título de la Adjudicación</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Identificador de la Adjudicación</p>
                <h4>{release.awards[0].id}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Estatus</p>
                <h4>{codeList('award.status', release.awards[0].status)}</h4>
              </div>
              <div className="col-md-8">
                <p className="lbl">Descripción de la Adjudicación</p>
                <p className="txt-bold">{'No disponible'}</p>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Fecha</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Valor y Moneda</p>
                <h4>{formatAmount(release.awards[0].value.amount)}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">No. de Inconformidades Recibidas</p>
                <h4>{'No disponible'}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">No. de Inconformidades Rechazadas</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Identificador de Proveedor</p>
                <h4>{release.awards[0].suppliers[0].identifier.id}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Nombre de Proveedor</p>
                <h4>{release.awards[0].suppliers[0].identifier.legalName}</h4>
              </div>
            </div>
          </div>

          {/* Contracting */}
          <div role="tabpanel" className="tab-pane fade" id="contract">
            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Identificador del Contrato</p>
                <h4>{release.contracts[0].id}</h4>
              </div>
              <div className="col-md-8">
                <p className="lbl">Título del Contrato</p>
                <h4>{release.contracts[0].title}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-8">
                <p className="lbl">Descripción del Contrato</p>
                <p className="txt-bold">{'No disponible'}</p>
              </div>
              <div className="col-md-4">
                <p className="lbl">Estatus</p>
                <h4>{codeList('contract.status', release.contracts[0].status)}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Periodo</p>
                <h4>
                  {
                    release.contracts[0].period ? (
                      formatDate(release.contracts[0].period.startDate, 'DD/MM/YYYY')
                      + ' - ' +
                      formatDate(release.contracts[0].period.endDate, 'DD/MM/YYYY')
                    ) : '-'
                  }
                </h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Valor y Moneda</p>
                <h4>{formatAmount(release.contracts[0].value.amount)}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Fecha de Firma del Contrato</p>
                <h4>{formatDate(release.contracts[0].dateSigned, 'DD/MM/YYYY')}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-12">
                <p className="lbl">¿SE MODIFICÓ EL CONTRATO?</p>
                <h4>{'No disponible'}</h4>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div role="tabpanel" className="tab-pane fade" id="implementation">
            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Realización del Pago</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Emisión del Pago</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Ficha de Transacción</p>
                <h4>{'No disponible'}</h4>
              </div>
            </div>

            <div className="row contract-highlights border-bottom">
              <div className="col-md-4">
                <p className="lbl">Monto y Moneda</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Identificador de Organización</p>
                <h4>{'No disponible'}</h4>
              </div>
              <div className="col-md-4">
                <p className="lbl">Nombre de Organización</p>
                <h4>{'No disponible'}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
