// -- class checker --
// let file_path_2 = document.getElementById("dpacks_read_script").src;
// let the_arr_2 = file_path_2.split('/');
// the_arr_2.pop();

const user_normal_check = JSON.parse(localStorage.getItem('user'));
if (!user_normal_check) {
    dpacks()
}

function dpacks() {

    // let tagsList = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'b', 'strong', 'i', 'em', 'mark', 'small', 'del', 'ins', 'sub', 'sup'];
    let tagsList = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const jsonData = document.querySelectorAll(tagsList);
    for (let i = 0; i < jsonData.length; i++) {

        // -- id declaration --
        let id = jsonData[i].id;

        axios.get(API_URL + '/api/v1/data-packets/check', {
                headers: {
                    siteId: dpacks_key,
                    page: pageId,
                    element: id
                }
            }
        ).then(function (response) {
            if (response.data.exists === 1) {
                fetch('https://data.testcod.top/dpacks-3e038.appspot.com/' + dpacks_key + '_' + pageId + '_' + id + '.json')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        appendData(data);
                    })
                    .catch(function (err) {
                        console.log('error: ' + err);
                    });
            }
        }).catch(function (error) {
            console.log(error);
        });

        // -- append data from data files (view fetch) - function --
        function appendData(data) {

            // -- main container --
            let mainContainer = document.getElementById(id);

            // -- text --
            mainContainer.innerText = data.text;

            // -- attributes --
            let atrArray = data.attributes;

            if (atrArray.length !== {}) {
                Object.keys(atrArray).forEach(key => {
                    mainContainer.removeAttribute(key);
                    mainContainer.setAttribute(key, atrArray[key]);
                });
            }

        }
    }
}