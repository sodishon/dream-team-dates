
fetch('deadlines.csv')
.then(r=>r.text())
.then(t=>{
 const rows=t.trim().split('\n').slice(1).map(r=>r.split(','));
 rows.sort((a,b)=>new Date(a[1])-new Date(b[1]));

 const today=new Date();

 const up=document.getElementById('upcoming');
 up.innerHTML=rows.slice(0,5).map(r=>`${r[0]} &nbsp;&nbsp; ${r[2]}`).join('<br>');

 document.getElementById('weeks').innerHTML=`
 <div>🍁<br>2 weeks<br>or less</div>
 <div>🍂<br>2-4 weeks</div>
 <div>🍂<br>5-6 weeks</div>
 <div>🍃<br>6+ weeks</div>`;

 const tb=document.getElementById('tableBody');

 function badge(c){
  if(c.includes('LSUE')) return '<span class="badge lsueB">LSUE</span>';
  if(c.includes('LSUA')) return '<span class="badge lsuaB">LSUA</span>';
  if(c.includes('BSPH')) return '<span class="badge bsphB">BSPH</span>';
  return '<span class="badge dnpB">DNP</span>';
 }

 rows.slice(0,9).forEach(r=>{
  const days=Math.ceil((new Date(r[1])-today)/86400000);
  tb.innerHTML += `<tr>
   <td>${badge(r[0])}</td>
   <td>${r[1]}</td>
   <td>${r[2]}</td>
   <td class="days">${days} days</td>
  </tr>`;
 });

 document.getElementById('search').addEventListener('input',e=>{
   const q=e.target.value.toLowerCase();
   [...tb.rows].forEach(row=>{
      row.style.display=row.innerText.toLowerCase().includes(q)?'':'none';
   });
 });
});
