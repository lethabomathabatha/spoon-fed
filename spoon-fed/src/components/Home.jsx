// import React from 'react';
import RecommendedPicks  from './RecommendedPicks.jsx';
import HomeStyles from './HomeStyles.css';
import TextField from '@mui/material/TextField';
import * as Icons from '@mui/icons-material';

export default function Home() {
    return (
        <div className='home--body'>
            <nav>SpoonFed</nav>
            <div className="home--search-bar">
                <TextField 
                    className='home--search-input'
                    id="outlined-basic" 
                    label="" variant="outlined" 
                    placeholder="This is what I have" 
                    size="small" 
                    color="warning"
                />
                <Icons.Search />
            </div>
            <RecommendedPicks />
        </div>
    );
}