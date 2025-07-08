const translations = {
    en:{
        brand:'Brand',
        model:'Model',
        year:'Year',
        part:'Required Part',
        images:'Upload Images (up to 10, 5MB each)',
        phone:'Phone / WhatsApp',
        submit:'Submit',
        thanks:'Thanks for submitting, we will contact you soon.'
    },
    ar:{
        brand:'\u0645\u0627\u0631\u0643\u0629',
        model:'\u0637\u0631\u0627\u0632',
        year:'\u0633\u0646\u0629',
        part:'\u0627\u0644\u0642\u0637\u0639\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629',
        images:'\u0627\u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631 (10 \u062d\u062f \u0623\u0642\u0635\u0649, 5MB)',
        phone:'\u0627\u0644\u0647\u0627\u062a\u0641/\u0648\u0627\u062a\u0633\u0627\u0628',
        submit:'\u0625\u0631\u0633\u0627\u0644',
        thanks:'\u0634\u0643\u0631\u064b\u0627 \u0639\u0644\u0649 \u0627\u0644\u0625\u0631\u0633\u0627\u0644, \u0633\u0646\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0642\u0631\u064a\u0628\u064b\u0627.'
    }
};

const userLang = navigator.language.startsWith('ar') ? 'ar' : 'en';

document.documentElement.lang = userLang;
const t = translations[userLang];

document.querySelector('label[for="brand"]').textContent = t.brand;
document.querySelector('label[for="model"]').textContent = t.model;
document.querySelector('label[for="year"]').textContent = t.year;
document.querySelector('label[for="part"]').textContent = t.part;
document.querySelector('label[for="images"]').textContent = t.images;
document.querySelector('label[for="phone"]').textContent = t.phone;
document.querySelector('button').textContent = t.submit;

const brandSelect = document.getElementById('brand');
const brandManual = document.getElementById('brandManual');
const modelSelect = document.getElementById('model');
const modelManual = document.getElementById('modelManual');

fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json')
.then(r => r.json())
.then(data => {
    data.Results.slice(0,200).forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.Make_Name;
        opt.textContent = m.Make_Name;
        brandSelect.appendChild(opt);
    });
    brandSelect.insertAdjacentHTML('beforeend','<option value="manual">Other</option>');
})
.catch(()=>{
    brandSelect.classList.add('hidden');
    brandManual.classList.remove('hidden');
});

brandSelect.addEventListener('change', e=>{
    if(e.target.value === 'manual'){
        brandManual.classList.remove('hidden');
    }else{
        brandManual.classList.add('hidden');
    }
    modelSelect.innerHTML='';
    if(e.target.value === 'manual') return;
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${e.target.value}?format=json`)
    .then(r=>r.json())
    .then(d=>{
        d.Results.forEach(m=>{
            const opt = document.createElement('option');
            opt.value=m.Model_Name;
            opt.textContent=m.Model_Name;
            modelSelect.appendChild(opt);
        });
        modelSelect.insertAdjacentHTML('beforeend','<option value="manual">Other</option>');
    })
    .catch(()=>{
        modelSelect.classList.add('hidden');
        modelManual.classList.remove('hidden');
    });
});

modelSelect.addEventListener('change',e=>{
    if(e.target.value === 'manual'){
        modelManual.classList.remove('hidden');
    }else{
        modelManual.classList.add('hidden');
    }
});

const yearSelect = document.getElementById('year');
const currentYear = new Date().getFullYear();
for(let y=currentYear; y>=1980; y--){
    const opt = document.createElement('option');
    opt.value= y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
}

fetch('https://ipapi.co/json')
.then(r=>r.json())
.then(d=>{
    if(d && d.country_calling_code){
        document.getElementById('phone').value = d.country_calling_code;
    }
});

const form=document.getElementById('partsForm');
form.addEventListener('submit',e=>{
    e.preventDefault();
    const fd = new FormData(form);
    fetch('/submit',{
        method:'POST',
        body:fd
    }).then(r=>r.json()).then(res=>{
        if(res.success){
            form.classList.add('hidden');
            const c = document.getElementById('confirmation');
            c.textContent = t.thanks;
            c.classList.remove('hidden');
        }
    });
});
