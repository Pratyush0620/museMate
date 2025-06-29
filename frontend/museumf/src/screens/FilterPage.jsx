import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate, useLocation, Link} from "react-router-dom";
import Nav from "../frontendComponents/Nav.jsx";
import museheader from "../../public/assets/museumlistback.png";


function Dropdown() {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [museums, setMuseums] = useState([]);

    const [stateWasThere, setStateWasThere] = useState(false);

    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedMuseum, setSelectedMuseum] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const BASE_URL =
        "https://guyk0ymti9.execute-api.ap-south-1.amazonaws.com/server-dev";

    //   const BASE_URL = "http://localhost:3000";

    useEffect(() => {
        axios
            .get(BASE_URL + "/api/states")
            .then((response) => setStates(response.data))
            .catch((error) => console.error("Error fetching states:", error));
    }, []);

    useEffect(() => {
        if (selectedState.length !== 0) {
            setStateWasThere(true);
        }
        const params = new URLSearchParams(location.search);
        const state = params.get("state");
        const city = params.get("city");
        const museum = params.get("museum");
        console.log(state);
        console.log(city);
        console.log(museum);
        if (state) setSelectedState(state);
        if (city) setSelectedCity(city);
        if (museum) setSelectedMuseum(museum);
    }, [location.search]);

    useEffect(() => {
        if (selectedState) {
            if (stateWasThere) {
                console.log("doin");
                setSelectedCity("");
                setSelectedMuseum("");
            }

            axios
                .get(BASE_URL + `/api/cities?state_code=${selectedState}`)
                .then((response) => setCities(response.data))
                .catch((error) => console.error("Error fetching cities:", error));

            axios
                .get(BASE_URL + `/api/museums?state_code=${selectedState}`)
                .then((response) => setMuseums(response.data))
                .catch((error) => console.error("Error fetching museums:", error));

            navigate(`/home/museum?state=${selectedState}`, { replace: true });
            //After navigation fetching it once again to render according to state
            axios
                .get(BASE_URL + `/api/museums?state_code=${selectedState}`)
                .then((response) => setMuseums(response.data))
                .catch((error) => console.error("Error fetching museums:", error));

            //   const queryParams = new URLSearchParams(location.search);
            //   queryParams.delete("city");

            //   setSelectedCity("");
            //   setSelectedMuseum("");
        } else {
            setCities([]);
            setMuseums([]);
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedCity) {
            console.log("coming");

            axios
                .get(BASE_URL + `/api/museums?city_name=${selectedCity}`)
                .then((response) => setMuseums(response.data))
                .catch((error) => console.error("Error fetching museums:", error));

            const queryParams = new URLSearchParams(location.search);
            queryParams.delete("museum");
            navigate(`/home/museum?state=${selectedState}`, { replace: true });
            if (selectedCity != setSelectedCity) {
                if (stateWasThere) {
                    setSelectedMuseum("");
                }

                console.log("HloÂ saby");
            }
        }
    }, [selectedCity, selectedState]);

    useEffect(() => {
        if (selectedCity) {
            const queryParams = new URLSearchParams(location.search);
            queryParams.set("city", selectedCity);
            queryParams.delete("museum");
            console.log("museum deleting");

            navigate(`/home/museum?state=${selectedState}&city=${selectedCity}`, {
                replace: true,
            });
        }
    }, [selectedCity, navigate, location.search]);

    useEffect(() => {
        if (selectedMuseum) {
            const queryParams = new URLSearchParams(location.search);
            queryParams.set("museum", selectedMuseum);

            navigate(
                `/home/museum?state=${selectedState}&city=${selectedCity}&museum=${selectedMuseum}`,
                { replace: true }
            );
        }
    }, [selectedMuseum, navigate, location.search]);

    const handlerTicketID = (ID) => {
        console.log(ID);
    }

    const styles = {
        dropdownButtons: {
            display: "flex",
            marginBottom: "20px",
        },
        select: {
            padding: "10px",
            borderRadius: "50px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            fontSize: "14px",
            width: "200px",
            transition: "border-color 2s ease",
        },
        container: {
            display: "flex",
        },
    };

    const filteredMuseums = museums.filter((museum) => {
        return (
            (!selectedState || museum.state_code === selectedState) &&
            (!selectedCity || museum.city_name === selectedCity) &&
            (!selectedMuseum || museum.name === selectedMuseum)
        );
    });

    return (
        <>
            <Nav/>
            <div className='w-screen h-[10vh] bg-cover bg-center'
                 style={{backgroundImage: `url(${museheader})`}}>
            </div>
            <div>
                <div style={styles.container}>
                    <div style={styles.dropdownButtons}>
                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            style={styles.select}
                        >
                            <option value="">--Select State--</option>
                            {states.map((state) => (
                                <option key={state.id} value={state.state_code}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.dropdownButtons}>
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!selectedState}
                            style={styles.select}
                        >
                            <option value="">--Select City--</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.dropdownButtons}>
                        <select
                            value={selectedMuseum}
                            onChange={(e) => setSelectedMuseum(e.target.value)}
                            disabled={!selectedCity}
                            style={styles.select}
                        >
                            <option value="">--Select Museum--</option>
                            {museums.map((museum) => (
                                <option key={museum.id} value={museum.name}>
                                    {museum.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    {filteredMuseums.map((museum) => (
                        <div key={museum.id} className="flex flex-col my-8">
                            <div className=" mb-4">
                                <h2 className="text-4xl font-bold">{museum.name}</h2>
                                <p className="text-lg text-gray-600">{museum.city_name}, {selectedState}</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handlerTicketID(museum.id)}
                                    className="px-6 py-2 bg-[#3A0D0C] text-white rounded-full shadow-md hover:bg-[#2C0A09] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A0D0C]"
                                >
                                    Get Tickets
                                </button>
                                <Link
                                    className="px-6 py-2 bg-transparent text-[#3A0D0C] border border-[#3A0D0C] rounded-full shadow-md hover:bg-[#f7f5f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A0D0C]"
                                    to={`/museums/${museum.id}`}
                                >
                                    See More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default Dropdown;