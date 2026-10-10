const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const monthly = document.getElementById('monthly'), years = document.getElementById('years'), rate = document.getElementById('rate');
function calculate(){
 const p=+monthly.value, n=+years.value*12, r=+rate.value/1200;
 const fv=r===0?p*n:p*(Math.pow(1+r,n)-1)/r*(1+r);
 const paid=p*n;
 document.getElementById('monthlyValue').textContent=inr(p);
 document.getElementById('yearsValue').textContent=years.value+' '+(+years.value===1?'year':'years');
 document.getElementById('rateValue').textContent=rate.value+'%';
 document.getElementById('futureValue').textContent=inr(fv);
 document.getElementById('contributedValue').textContent=inr(paid);
 document.getElementById('growthValue').textContent=inr(Math.max(0,fv-paid));
 document.getElementById('contributedBar').style.width=(paid/fv*100)+'%';
}
[monthly,years,rate].forEach(x=>x.addEventListener('input',calculate));calculate();
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('leadForm').addEventListener('submit',async e=>{
 e.preventDefault();const message=document.getElementById('formMessage');message.textContent='Saving…';
 try{const res=await fetch('/api/interest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:document.getElementById('name').value,email:document.getElementById('email').value,goal:document.getElementById('goal').value})});const data=await res.json();message.textContent=data.message;if(res.ok)e.target.reset();}
 catch{message.textContent='Could not save. Please make sure the local Python server is running.'}
});
