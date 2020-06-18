import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { FiLogIn, FiX } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../assets/logo.png';
//import logo from '../../assets/logo.png'
import './styles.css';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Home = () => {
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    const [modalVisible, setModalVisible] = useState(false);

    const history = useHistory();

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then((response) => {
            if (response.status !== 200) {
                return;
            }
            const ufInitials = response.data.map((uf) => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then((response) => {
            if (response.status !== 200) {
                return;
            }
            const citiesData = response.data.map((city) => city.nome);
            setCities(citiesData);
        });
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleNavigateToPoints() {
        history.push(`/points/${selectedUf}/${selectedCity}`);
    }

    function handleSearchClick() {
        setModalVisible(true);
    }

    function handleCloseModalClick() {
        setModalVisible(false);
    }

    return (
        <>
            <div id="page-home">
                <div className="content">
                    <header>
                        <img src={logo} alt="Ecoleta" />
                    </header>

                    <main>
                        <h1>Seu marketplace de locais para doações.</h1>
                        <p>Ajudamos pessoas à encontrarem pontos de doações de forma eficiente.</p>

                        <Link className="button" to="/create-point">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Cadastre uma doação</strong>
                        </Link>

                        <p>Ou <span className="fake-link" onClick={handleSearchClick}>encontre uma doação próximo de você</span>.</p>
                    </main>
                </div>
            </div>

            {modalVisible && (
                <div className="overlay">
                    <div className="close-button" onClick={handleCloseModalClick}>
                        <FiX />
                    </div>
                    <div className="text-area">
                        <div>Locais da doação</div>
                    </div>
                    <div className="overlay-form">
                        <div className="field">
                            <select
                                value={selectedUf}
                                onChange={handleSelectUf}
                                name="uf"
                                id="uf"
                            >
                                <option value="0">Selecione o estado</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <select
                                value={selectedCity}
                                onChange={handleSelectCity}
                                name="city"
                                id="city"
                            >
                                <option value="0">Selecione a cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <span className="button" onClick={handleNavigateToPoints}>
                                <strong>Encontrar</strong>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;