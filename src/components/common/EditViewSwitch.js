import React, {useEffect} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

export default function EditViewSwitch(props) {
    const [state, setState] = React.useState({
        checkedA: true
    });
    
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    useEffect(() => {
        props.onStateChange(state)
    }, [state])
    
    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
                }
                label="Switch View"
            />
        </FormGroup>
    )
}