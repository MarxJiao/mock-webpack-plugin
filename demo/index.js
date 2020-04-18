import axios from 'axios';

axios.get('/api/json/data').then(res => {
    console.log(res.data);
});
