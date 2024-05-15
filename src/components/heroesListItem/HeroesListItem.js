import { useSelector, useDispatch } from "react-redux";
import {heroesDelete} from "../../actions/index";
import { useHttp } from "../../hooks/http.hook";
import logo from '../../assets/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png'
const HeroesListItem = ({id, name, description, element}) => {
    
    const dispatch = useDispatch()
    
    const state = useSelector(state => state.heroes);
    const {request} = useHttp();
    const deleteHeroe = () => {
        const result = state.filter(item => item.id !== id)
        dispatch(heroesDelete(result));
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
    }




    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src={logo} 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close" onClick={()=> deleteHeroe()}></button>
            </span>
        </li>
    )
}

export default HeroesListItem;