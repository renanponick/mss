import React from 'react'
import '../style/Cadastro.css'
import Navbar from '../components/Navbar';

function Cadastros() {
    return (
    <div>
        <Navbar />
        <div class="row">
            <div class="column">
                <div class="card">
                    <div>
                        <img src='http://www.ssp.df.gov.br/wp-conteudo/uploads/2017/10/3-01-300x227.jpg' />
                    </div>
                    <div className='card-content'>

                        <div className='card-title'>
                            <h3> Paciente</h3>
                        </div>
                        <div className='card-body'>
                            <p>Acesse ao cadastro do Paciente</p>
                        </div>
                        <div className='btn'>
                            <button>
                                <a href = './cadastroPaciente'>
                                    CADASTRE AQUI
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="card">
                <div>
                        <img src='https://image.freepik.com/vetores-gratis/grupo-de-personagens-de-avatar-de-medicos_24877-62364.jpg' />
                    </div>
                    <div className='card-content'>

                        <div className='card-title'>
                            <h3> Medicos </h3>
                        </div>
                        <div className='card-body'>
                            <p>Acesse ao cadastro do Medico</p>
                        </div>
                        <div className='btn'>
                            <button>
                                <a href = './cadastroMedico'>
                                    CADASTRE AQUI
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="card">
                <div>
                        <img src='https://www.crfes.org.br/wp-content/uploads/2019/06/inovafarma-farmacia.png' />
                    </div>
                    <div className='card-content'>

                        <div className='card-title'>
                            <h3> Farmacia</h3>
                        </div>
                        <div className='card-body'>
                            <p>Acesse ao cadastro da Farmacia</p>
                        </div>
                        <div className='btn'>
                            <button>
                                <a href = "./cadastroFarmacia" >
                                    CADASTRE AQUI
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Cadastros;