import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setProductsList } from '../store/silces/productsSlice.jsx';


function useFetchAllData({userIn}) {
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`http://127.0.0.1:3305/${userIn}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token'),
          }
        }).then(response => {
          return response.json();
        }).then(data => {
          dispatch(setProductsList(data));
        }
        )
      }, []);  
}

export default useFetchAllData;