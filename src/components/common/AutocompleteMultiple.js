import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
        InputProps={{
            inputRef: ref,
            classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
            },
            ...InputProps,
        }}
        {...other}
        />
    );
}

function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.name}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}>
        {suggestion.name}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(suggestions, value, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter(suggestion => {
            const keep =
            count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;
            if (keep) {
            count += 1;
            }

            return keep;
        });
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    },
}));

export default function DownshiftMultiple(props) {
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState([]);
    const required = props.required === "true" ? ' *' : '';
    
    useEffect(() => {
        let newSelectedItem = [];
        if (props && props.value !== 'undefined') {
            let propsValue = props.value
            if (typeof propsValue == "string") {
                propsValue = propsValue.split(",");
            }
            propsValue.map((item,index) => {
                if (selectedItem.indexOf(item.id) === -1) {
                    newSelectedItem = selectedItem.concat(item);
                    setInputValue('');
                    setSelectedItem(newSelectedItem);
                }
            })
        }
        
    },[])

    function handleKeyDown(event) {
        if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
        setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleChange(item) {
        let newitem = {}
        props.collection.map((suggestion,index) => {
            if (suggestion.id == item.id) {
                newitem.id = suggestion.id
                newitem.label = suggestion.name
                let newSelectedItem = [...selectedItem];
                let validStateChecker = 0
                selectedItem.map((item,index) => {
                    if (item.id === newitem.id) {
                        validStateChecker = 1
                    }
                })
                if(validStateChecker == 0) {
                    newSelectedItem = [...newSelectedItem, newitem];
                    setInputValue('');
                    setSelectedItem(newSelectedItem);
                } else {
                    setInputValue('');
                    
                }
            }
        })
    }

    const handleDelete = item => () => {
        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        setSelectedItem(newSelectedItem);
    };

    const itemToString = item => (item ? item.label : '')
    

    return (
        <div className={classes.root}>
            <div className={classes.divider} />
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={handleChange}
                itemToString={itemToString}
                selectedItem={selectedItem}
                onStateChange={() => props.onStateChange(selectedItem)}
            >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                isOpen,
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
            }) => {
                const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                    onKeyDown: handleKeyDown,
                    placeholder: 'Type Something Here',
                });

                return (
                    <div className={classes.container}>
                        {renderInput({
                        fullWidth: true,
                        classes,
                        label: `${props.label}${required}`,
                        InputLabelProps: getLabelProps(),
                        InputProps: {
                            startAdornment: (selectedItem || []).map(item => (
                            <Chip
                                key={item.id}
                                tabIndex={-1}
                                label={item.label}
                                className={classes.chip}
                                onDelete={handleDelete(item)}
                            />
                            )),
                            onBlur,
                            onChange: event => {
                            handleInputChange(event);
                            onChange(event);
                            },
                            onFocus,
                        },
                        inputProps,
                        })}

                        {isOpen ? (
                        <Paper className={classes.paper} square>
                            {getSuggestions(props.collection, inputValue2).map((suggestion, index) =>
                            renderSuggestion({
                                suggestion,
                                index,
                                itemProps: getItemProps({ item: suggestion }),
                                highlightedIndex,
                                selectedItem: selectedItem2,
                            }),
                            )}
                        </Paper>
                        ) : null}
                    </div>
                );
            }}
            </Downshift>
            <FormHelperText>{props.helper}</FormHelperText>
        </div>
            
    );
}