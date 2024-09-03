// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { heroCreated } from "../../actions";

const HeroesAddForm = () => {
    const { filters, filtersLoadingStatus } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [element, setElement] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name,
            description,
            element,
        };
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then((res) => console.log(res, "Add successfully"))
            .then(dispatch(heroCreated(newHero)))
            .catch((err) => console.log(err));

        setName("");
        setDescription("");
        setElement("");
    };

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Loading elements...</option>;
        } else if (status === "error") {
            return <option>Error loading...</option>;
        }

        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                // eslint-disable-next-line
                if (name === "all") return;

                return (
                    <option key={name} value={name}>
                        {label}
                    </option>
                );
            });
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="border p-4 shadow-lg rounded"
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Имя нового героя
                </label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Описание
                </label>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                    name="description"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ height: "130px" }}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Выбрать элемент героя
                </label>
                <select
                    required
                    onChange={(e) => setElement(e.target.value)}
                    value={element}
                    className="form-select"
                    id="element"
                    name="element"
                >
                    <option value="">I have an element of...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                    {/* <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="wind">Wind</option>
                    <option value="earth">Earth</option> */}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
