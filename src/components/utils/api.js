import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

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
                "tags":["React"],
                "contributors":["Divyang Bhambhani"],
                "owner":["Divyang Bhambhani"],
                "board":2
            },{
                "id":"2",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"3",
                "type":"Task List",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"4",
                "type":"Note",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"5",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"manisha sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"6",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"7",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"8",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"9",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"10",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"11",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"12",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"13",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"14",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"15",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"16",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"17",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"18",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"19",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
            },{
                "id":"20",
                "type":"Component",
                "pinTitle":"Title Two",
                "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
                "tags":["React", "PHP"],
                "contributors":["Divyang Bhambhani", "Manisha Sawlani"],
                "owner":"Manisha Sawlani",
                "command":"npm install pinboard",
                "board":1
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

export const addTags = (name) => {

    if (!name) {
        throw 'Tag Name is required';
    }

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

    return db.collection('tags').add(data).then((doc) => {
        return [{
            "status": true,
            "message": "Tag Name added successfully!",
            "data": {
                "id": doc.id,
                "name" : name
            }
        }];
    }).catch((error) => {
        return [{
            "status": false, 
            "message": error,
            "data": []
        }];
    });
}

  
export const getTags = (params = []) => {
   
    let result = [];
    return db.collection('tags').get().then((tagQuerySnapshot) => {
        tagQuerySnapshot.forEach(
            (doc) => {
                let tag = doc.data();
                tag.id = doc.id;
                result.push(tag);
            }
        );
        return [{
            "status": true, 
            "message": "",
            "data": result,
            "totalCount": 2
        }];
    }).catch((error) => {
        return [{
            "status": false, 
            "message": error,
            "data": [],
            "totalCount": 0
        }];
    });
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

const getBoardById = (id) => {

}

const updatePinById = (id) => {

}

const updateBoardById = (id) => {

}