import firebase from '../../config/firebaseConfig';

const db = firebase.firestore();

export const uploadPinImages = (acceptedFiles) => {
    const storageRef = firebase.storage().ref();
    console.log('ere')
    acceptedFiles.map((file, index) => {
        console.log(file.name, 'file')
        let metadata = {
            contentType: 'image/jpeg'
        };
        let uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            }, function(error) {
                console.log(error)
            }, function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                });
            });
    })
}

export const getPins = (params = []) => {
    return (
        [
            {
                "id":"1",
                "type":"Code Snippet",
                "pinTitle":"Title One",
                "pinBody":"<p>Hello&nbsp;</p><pre><code>const a={}</code></pre><pre><code>&lt;div&gt;</code></pre><pre><code>&nbsp;&nbsp;&nbsp;&nbsp;Hello World</code></pre><pre><code>&lt;div&gt;</code></pre>",
                "tags":[{ id:1, label: 'React'}],
                "contributors":[{id: 2, label:"Divyang Bhambhani"}],
                "owner":["Divyang Bhambhani"],
                "board":2,
                "createdDate":"1530533963917",
                "updatedDate":"1530533963917"
            },{
                "id":"2",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<h2>Usage</h2>\n<p>&nbsp;</p>\n<pre><code>import { DataTable } from 'grommet';<br>\n&lt;<strong>DataTable</strong> /&gt;<br>\n</code></pre>\n<h2>Properties</h2>\n<p><strong>a11yTitle</strong></p>\n<p>Custom title to be used by screen readers.</p>\n<pre><code>string<br>\n</code></pre>\n<p><strong>alignSelf</strong></p>\n<p>How to align along the cross axis when contained in a Box or along the column axis when contained in a Grid.</p>\n<pre><code>start<br>\ncenter<br>\nend<br>\nstretch<br>\n</code></pre>\n<p><strong>gridArea</strong></p>\n<p>The name of the area to place this inside a parent Grid.</p>\n<pre><code>string<br>\n</code></pre>\n<p><strong>margin</strong></p>\n<p>The amount of margin around the component. An object can be specified to distinguish horizontal margin, vertical margin, and margin on a particular side.</p>\n<pre><code>none<br>\nxxsmall<br>\nxsmall<br>\nsmall<br>\nmedium<br>\nlarge<br>\nxlarge<br>\n{<br>\n &nbsp;bottom: <br>\n &nbsp;&nbsp;&nbsp;xxsmall<br>\n &nbsp;&nbsp;&nbsp;xsmall<br>\n &nbsp;&nbsp;&nbsp;small<br>\n &nbsp;&nbsp;&nbsp;medium<br>\n &nbsp;&nbsp;&nbsp;large<br>\n &nbsp;&nbsp;&nbsp;xlarge<br>\n &nbsp;&nbsp;&nbsp;string,<br>\n &nbsp;horizontal: <br>\n &nbsp;&nbsp;&nbsp;xxsmall<br>\n &nbsp;&nbsp;&nbsp;xsmall<br>\n &nbsp;&nbsp;&nbsp;small<br>\n &nbsp;&nbsp;&nbsp;medium<br>\n &nbsp;&nbsp;&nbsp;large<br>\n &nbsp;&nbsp;&nbsp;xlarge<br>\n &nbsp;&nbsp;&nbsp;string,<br>\n &nbsp;left: <br>\n &nbsp;&nbsp;&nbsp;xxsmall<br>\n &nbsp;&nbsp;&nbsp;xsmall<br>\n &nbsp;&nbsp;&nbsp;small<br>\n &nbsp;&nbsp;&nbsp;medium<br>\n &nbsp;&nbsp;&nbsp;large<br>\n &nbsp;&nbsp;&nbsp;xlarge<br>\n &nbsp;&nbsp;&nbsp;string,<br>\n &nbsp;right: <br>\n &nbsp;&nbsp;&nbsp;xxsmall<br>\n &nbsp;&nbsp;&nbsp;xsmall<br>\n &nbsp;&nbsp;&nbsp;small<br>\n &nbsp;&nbsp;&nbsp;medium<br>\n &nbsp;&nbsp;&nbsp;large<br>\n &nbsp;&nbsp;&nbsp;xlarge<br>\n &nbsp;&nbsp;&nbsp;string,<br>\n &nbsp;top: <br>\n &nbsp;&nbsp;&nbsp;xxsmall<br>\n &nbsp;&nbsp;&nbsp;xsmall<br>\n &nbsp;&nbsp;&nbsp;small<br>\n &nbsp;&nbsp;&nbsp;medium<br>\n &nbsp;&nbsp;&nbsp;large<br>\n &nbsp;&nbsp;&nbsp;xlarge<br>\n &nbsp;&nbsp;&nbsp;string,<br>\n &nbsp;vertical: <br>\n &nbsp;&nbsp;&nbsp;xxsmall<br>\n &nbsp;&nbsp;&nbsp;xsmall<br>\n &nbsp;&nbsp;&nbsp;small<br>\n &nbsp;&nbsp;&nbsp;medium<br>\n &nbsp;&nbsp;&nbsp;large<br>\n &nbsp;&nbsp;&nbsp;xlarge<br>\n &nbsp;&nbsp;&nbsp;string<br>\n}<br>\nstring<br>\n</code></pre>\n<p><strong>columns</strong></p>\n<p>A description of the data. The order controls the column order. ‘property’ indicates which property in the data objects to associate the column with. ‘header’ indicates what to display in the column header. ‘render’ allows for custom rendering of body cells. Use ‘render’ for custom formatting for things like currency and date or to display rich content like Meters. ‘align’ indicates how the cells in the column are aligned. ‘aggregate’ indicates how the data in the column should be aggregated. This only applies to a footer or groupBy context. ‘footer’ indicates what should be shown in the footer for the column. ‘search’ indicates whether a search filter should be made available for the column. ‘primary’ indicates that this property should be used as the unique identifier, which gives the cell ‘row’ scope for accessibility. If ‘primary’ is not used for any column, and ‘primaryKey’ isn’t specified either, then the first column will be used. Defaults to <code>[]</code>.</p>\n<pre><code>[{<br>\n &nbsp;align: <br>\n &nbsp;&nbsp;&nbsp;center<br>\n &nbsp;&nbsp;&nbsp;start<br>\n &nbsp;&nbsp;&nbsp;end,<br>\n &nbsp;aggregate: <br>\n &nbsp;&nbsp;&nbsp;avg<br>\n &nbsp;&nbsp;&nbsp;max<br>\n &nbsp;&nbsp;&nbsp;min<br>\n &nbsp;&nbsp;&nbsp;sum,<br>\n &nbsp;footer: <br>\n &nbsp;&nbsp;&nbsp;node<br>\n &nbsp;&nbsp;&nbsp;{<br>\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aggregate: boolean<br>\n &nbsp;&nbsp;&nbsp;},<br>\n &nbsp;header: <br>\n &nbsp;&nbsp;&nbsp;string<br>\n &nbsp;&nbsp;&nbsp;node<br>\n &nbsp;&nbsp;&nbsp;{<br>\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aggregate: boolean<br>\n &nbsp;&nbsp;&nbsp;},<br>\n &nbsp;primary: boolean,<br>\n &nbsp;property: string,<br>\n &nbsp;render: function,<br>\n &nbsp;search: boolean,<br>\n &nbsp;sortable: boolean<br>\n}]<br>\n</code></pre>\n<p><strong>data</strong></p>\n<p>Array of data objects. Defaults to <code>[]</code>.</p>\n<pre><code>[{<br>\n<br>\n}]<br>\n</code></pre>\n<p><strong>groupBy</strong></p>\n<p>Property to group data by.</p>\n<pre><code>string<br>\n</code></pre>\n<p><strong>onMore</strong></p>\n<p>Use this to indicate that ‘data’ doesn’t contain all that it could. It will be called when all of the data rows have been rendered. This might be used when the total number of items that could be retrieved is more than you’d want to load into the browser. ‘onMore’ allows you to lazily fetch more from the server only when needed. This cannot be combined with properties that expect all data to be present in the browser, such as columns.search, sortable, groupBy, or columns.aggregate.</p>\n<pre><code>function<br>\n</code></pre>\n<p><strong>onSearch</strong></p>\n<p>When supplied, and when at least one column has ‘search’ enabled, this function will be called with an object with keys for property names and values which are the search text strings. This is typically employed so a back-end can be used to search through the data.</p>\n<pre><code>function<br>\n</code></pre>\n<p><strong>primaryKey</strong></p>\n<p>When supplied, indicates the property for a data object to use to get a unique identifier. See also the ‘columns.primary’ description. Use this property when the columns approach will not work for your data set.</p>\n<pre><code>string<br>\n</code></pre>\n<p><strong>resizeable</strong></p>\n<p>Whether to allow the user to resize column widths.</p>\n<pre><code>boolean<br>\n</code></pre>\n<p><strong>size</strong></p>\n<p>The height of the table body. If set, the table body will have a fixed height and the rows will be scrollable within it. In order to preserve header and footer cell alignment, all cells will have the same width. This cannot be used in combination with 'resizeable’.</p>\n<pre><code>small<br>\nmedium<br>\nlarge<br>\nxlarge<br>\nstring<br>\n</code></pre>\n<p><strong>sortable</strong></p>\n<p>Whether to allow the user to sort columns.</p>\n<pre><code>boolean<br>\n</code></pre>\n<h2>Intrinsic element</h2>\n<pre><code>table</code></pre>",
                "tags":[{ id:1, label: 'React'}, { id:3, label: "PHP"}],
                "contributors":[{id: 2, label:"Divyang Bhambhani"}, {id: 1, label:"Manisha Sawlani"}],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"3",
                "type":"Task List",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"4",
                "type":"Note",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"5",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"manisha sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"6",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"7",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"8",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"9",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"10",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"11",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"12",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"13",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"14",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"15",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"16",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"17",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"18",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"19",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            },{
                "id":"20",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1,
                "createdDate":"1551119400000",
                "updatedDate":"1562563964917"
            }
        ]
    )
}

const getPinById = (id) => {

}

export const getUsers = (params = []) => {
    return (
        [
            { id:1, label: 'Manisha Sawlani' },
            { id:2, label: 'Divyang Bhambhani' },
            { id:3, label: 'Mohit Solanki' }
        ]
    )
}

export const addTags = async (params) => {
    try {
        let name = params.name;

        let result = [];

        let status = 'Active';
        let createdDate = new Date().getTime();
        let updatedDate = new Date().getTime();

        const data = {
            name,
            status,
            createdDate,
            updatedDate
        };

        let tagRef  = await db.collection('tags').add(data);
        const tag = await tagRef.get();

        return ({
            "status": true,
            "message": "Tag Name added successfully!",
            "data": {
                "id": tagRef.id,
                "name" : name
            }
        });
    } catch (error) {
        return ({
            "status": false, 
            "message": error,
            "data": {}
        });
    }
}

  
export const getTags = async (params = []) => {
    try {
        let result = []
        let tagQuerySnapshot = await db.collection('tags').orderBy('name').get()

        tagQuerySnapshot.forEach(
            (doc) => {
                let tag = {}
                tag.id = doc.id
                tag.name = doc.data().name
                result.push(tag)
            }
        )
        return ({
            "status": true, 
            "message": "",
            "data": result
        })
    } catch (error) {
        return ({
            "status": false, 
            "message": error,
            "data": []
        })
    }
}

export const editTags = async(params = []) => {
    try {

    const id = params.id;
    const name = params.name;

    if (!id) throw new Error('id is blank');

    if (!name) throw new Error('Title is required');

    const data = { 
        name
    };

    const tagRef = await db.collection('fights')
        .doc(id)
        .set(data, { merge: true });

    return ({
        "status": true,
        "message": "Record updated successfully!",
        "data": {
            id: id,
            data
        }
    });


  } catch(error){

    return ({
        "status": false,
        "message": error,
        "data": []
    })

  }

}


export const deleteTags = async(params = []) => {
    try {

    const id = params.id;
    if (!id) throw new Error('id is blank');

    const tagRef = await db.collection('fights')
        .doc(id)
        .delete();

    return ({
        "status": true,
        "message": "Record deleted successfully!",
        "data": {
            id: id
        },
    });


  } catch(error){

    return ({
        "status": false,
        "message": error,
        "data": []
    })

  }

}


export const getBoards = (params) => {
    return (
        [
            {value: 0, label:'React Knowledgebase'},
            {value: 1, label:'LAMP Team'},
            {value: 2, label:'Java Team'},
        ]
    )
}

export const getBoardById = (id) => {
    console.group(id)
    return "LAMP Team"
}

const updatePinById = (id) => {

}

const updateBoardById = (id) => {

}