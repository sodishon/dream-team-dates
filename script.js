fetch('deadlines.csv')
.then(response => response.text())
.then(text => {

    const rows = text.trim().split('\n').slice(1);

    const data = rows.map(row => {
        const parts = row.split(',');
        return {
            campus: parts[0],
            date: parts[1],
            deadline: parts.slice(2).join(',')
        };
    });

    data.sort((a,b)=>new Date(a.date)-new Date(b.date));

    const today = new Date();

    const upcoming = document.getElementById('upcoming');
    upcoming.innerHTML = data.slice(0,5).map(item =>
        `🍁 ${item.campus} &nbsp;&nbsp; ${item.deadline}`
    ).join('<br>');

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    function badge(campus){
        if(campus.includes('LSUE')) return '<span class="badge lsueB">LSUE</span>';
        if(campus.includes('LSUA')) return '<span class="badge lsuaB">LSUA</span>';
        if(campus.includes('BSPH')) return '<span class="badge bsphB">BSPH</span>';
        return '<span class="badge dnpB">DNP</span>';
    }

    data.forEach(item => {

        const days = Math.ceil(
            (new Date(item.date) - today) / 86400000
        );

        tableBody.innerHTML += `
        <tr>
            <td>${badge(item.campus)}</td>
            <td>${item.date}</td>
            <td>${item.deadline}</td>
            <td class="days">${days} days</td>
        </tr>`;
    });

    document.getElementById('search').addEventListener('input', function(e){

        const query = e.target.value.toLowerCase();

        [...tableBody.rows].forEach(row=>{
            row.style.display =
                row.innerText.toLowerCase().includes(query)
                ? ''
                : 'none';
        });

    });

});
