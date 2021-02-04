fetch('https://api.github.com/repos/iAmGio/chorus/releases/latest', {
    method: 'GET'
}).then(async response => {
    const data = await response.json();

    let dateRaw = data.assets[0].updated_at.substring(0, data.assets[0].updated_at.length - 10);
    let date = dateRaw.split("-");

    document.getElementById('version').innerHTML = data.tag_name;
    document.getElementById('date').innerHTML = date[0] + "/" + date[1] + "/" + date[2];

    const exe = data.assets[0].browser_download_url;
    const jar = data.assets[1].browser_download_url;

    document.getElementById("exec_exe").setAttribute("href", exe);
    for (let jarElement of document.getElementsByClassName("exec_jar")) {
        jarElement.setAttribute("href", jar);
    }
})