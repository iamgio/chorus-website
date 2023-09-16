function updateDownloadUrls() {
    fetch('https://api.github.com/repos/iAmGio/chorus/releases/latest', {
        method: 'GET'
    }).then(async response => {
        const data = await response.json();

        let dateRaw = data.assets[0].updated_at.substring(0, data.assets[0].updated_at.length - 10);
        let date = dateRaw.split("-");

        document.getElementById('version').innerHTML = data.tag_name;
        document.getElementById('date').innerHTML = date[0] + "/" + date[1] + "/" + date[2];

        const exe = getAssetUrlBySuffix(data.assets, '.exe');
        const armApp = getAssetUrlBySuffix(data.assets, 'arm.app.zip');
        const x86App = getAssetUrlBySuffix(data.assets, 'x86.app.zip');
        const jar = getAssetUrlBySuffix(data.assets, '.jar');

        document.getElementById("exec_exe").setAttribute("href", exe);
        document.getElementById("exec_arm_app").setAttribute("href", armApp);
        document.getElementById("exec_x86_app").setAttribute("href", x86App);
        document.getElementById("exec_jar").setAttribute("href", jar);
    })
}

function getAssetUrlBySuffix(assets, suffix) {
    const filtered = assets.filter(asset => asset.name.endsWith(suffix))
    if (Array.isArray(filtered) && !filtered.length) {
        console.error("Could not find asset with suffix " + suffix);
        return undefined;
    }
    return filtered[0].browser_download_url;
}

function initAddonFieldListener() {
    const field = document.getElementById("addon-field");
    field.addEventListener('keyup', e => {
        if (e.key == 'Enter' && field.value.length > 0) {
            downloadAddon(field);
        }
        field.style.backgroundColor = '';
        field.parentElement.style.animation = ''
    })
}

function downloadAddon(field) {
    field = field ? field : document.getElementById("addon-field");

    const buttonContent = document.getElementById('addon-button-content');
    const buttonDefaultClass = 'fas fa-download';
    const buttonLoadingClass = 'fas fa-spinner fa-pulse';

    if(buttonContent.className == buttonLoadingClass) return

    buttonContent.className = buttonLoadingClass;

    GitZip.zipRepo("https://github.com/iAmGio/chorus-addons/tree/master/" + field.value, undefined, () => {
        field.style.backgroundColor = 'rgba(255, 120, 120, 0.2)';
        field.parentElement.style.animation = 'shake 0.3s'
        setTimeout(() => {
            field.style.backgroundColor = '';
            field.parentElement.style.animation = '';
        }, 400);
    }).then(() => {
        buttonContent.className = buttonDefaultClass;
    });
}