import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetching, filtersFetched, filtersFetchingError, updateHeroes, heroesFetched, heroesFetchingError} from '../../actions';
const HeroesFilters = () => {

    const {filters, heroes} = useSelector(state => state);
    const {request} = useHttp();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
        // eslint-disable-next-line
    }, []);

    const onFilter = (e) => {
        switch(e.target.id){
            case 'fire':
                dispatch(updateHeroes(heroes.filter(item => item.element === 'fire')))
                break;
            case 'water':
                dispatch(updateHeroes(heroes.filter(item => item.element === 'water')))
                break;
            case 'wind':
                dispatch(updateHeroes(heroes.filter(item => item.element === 'wind')))
                break;
            case 'earth':
                dispatch(updateHeroes(heroes.filter(item => item.element === 'earth')))
                break;
            default:
                request("http://localhost:3001/heroes")
                    .then(data => dispatch(heroesFetched(data)))
                    .catch(() => dispatch(heroesFetchingError()))
            }
    }

    const renderButton = (arr) => {
        return arr.map((item)=>{
            switch (item) {
                case 'fire':
                    return <button onClick={(e)=>onFilter(e)} style={{'width': '74px'}} className="btn btn-danger" key={item} id={item}>Огонь</button>;
                case 'water':
                    return <button onClick={(e)=>onFilter(e)} style={{'width': '74px'}} className="btn btn-primary" key={item} id={item}>Вода</button>;
                case 'wind':
                    return <button onClick={(e)=>onFilter(e)} style={{'width': '74px'}} className="btn btn-success" key={item} id={item}>Ветер</button>;
                case 'earth':
                    return <button onClick={(e)=>onFilter(e)} style={{'width': '74px'}} className="btn btn-secondary" key={item} id={item}>Земля</button>;
                default:
                    return <button onClick={(e)=>onFilter(e)} style={{'width': '74px'}} className="btn btn-outline-dark active" key={item} id={item}>Все</button>;
            }
        })
    }
    const buttons = renderButton(filters)
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">    
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;