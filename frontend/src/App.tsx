import './App.css'
import {useEffect, useState} from "react";
import {Pet} from "./model/Pet.ts";
import axios from "axios";
import {PetCard} from "./components/PetCard.tsx";
import catLogo from "./assets/cat.blue.svg"
import dogLogo from "./assets/dog.blue.svg"
import filterLogo from "./assets/filter.jpg"
import searchLogo from "./assets/search-icon.webp"
import {LogoLogin} from "./components/LogoLogin.tsx";
import {NavBar} from "./components/NavBar.tsx";

export default App

function App() {

    const [petList, setPetList] = useState<Pet[]>([])
    const [isChecked, setIsChecked] = useState<boolean[]>([false, false])

    function fetchPets() {
        axios.get("/api/pets")
            .then((response) => {
                setPetList(response.data)
            })
            .catch((error) => console.log(error.message))
    }

    function handleCheckboxChange(checkboxNumber:number) {
        if (isChecked[checkboxNumber]) {
            setIsChecked({...isChecked, [checkboxNumber] : false})
        } else {
            setIsChecked({...isChecked, [checkboxNumber] : true})
        }
    }

    useEffect(() => {
        fetchPets()
    }, [petList])


  return (
    <>
        <header>
            <LogoLogin />
            <NavBar />
        </header>
        <main>
            <div className={"input_container"}>
                <form className={"input_form"}>
                    <select name={"Suche"}>
                        <option>Familienmitglied</option>
                        <option>Befristete Pflege</option>
                        <option>Spazierbegleitung</option>
                    </select>

                    <input placeholder={"Wohnort"} className={"inputBar_element"} type={"text"}/>

                    <select>
                        <option>5km</option>
                        <option>10km</option>
                        <option>20km</option>
                        <option>50km</option>
                    </select>

                    <button><img id={"search_logo"} src={searchLogo}/></button>
                </form>
            </div>
            <div className={"filter_container"}>
                <div className={"species_filter_container"}>
                    <input
                        type={"checkbox"}
                        id={"species_filter_cat"}
                        checked={isChecked[0]}
                        onChange={() => handleCheckboxChange(0)}
                    />
                    <label htmlFor={"species_filter_cat"}><img id="cat_logo" src={catLogo}/></label>

                    <input
                        type={"checkbox"}
                        id={"species_filter_dog"}
                        checked={isChecked[1]}
                        onChange={() => handleCheckboxChange(1)}
                    />
                    <label htmlFor={"species_filter_dog"}><img id="dog_logo" src={dogLogo}/></label>
                </div>
                <div>
                    <button><img id="filter_logo" src={filterLogo}/></button>
                </div>
            </div>
            {!isChecked[0] && !isChecked[1] &&
            <div className={"petCard_container"}>
                {petList.map((pet: Pet) => (
                    <PetCard id={pet.id} name={pet.name} species={pet.species} images={pet.images} key={pet.id}/>
                ))}
            </div>
            }

            {isChecked[0] && !isChecked[1] &&
                <div className={"petCard_container"}>
                    {petList.filter((pet: Pet) => (pet.species === "dog"))
                        .map((pet: Pet) => (
                        <PetCard id={pet.id} name={pet.name} species={pet.species} images={pet.images} key={pet.id}/>
                    ))}
                </div>
            }

            {isChecked[1] && !isChecked[0] &&
                <div className={"petCard_container"}>
                    {petList.filter((pet: Pet) => (pet.species === "cat"))
                        .map((pet: Pet) => (
                            <PetCard id={pet.id} name={pet.name} species={pet.species} images={pet.images} key={pet.id}/>
                        ))}
                </div>
            }
        </main>
        <footer>
            Footer
        </footer>

    </>
  )
}

