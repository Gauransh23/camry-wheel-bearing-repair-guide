/* Original review-v2 schematics. Geometry is illustrative, not measured Camry CAD. */
window.CamryDiagrams=(()=>{
 const text=(x,y,s,c='label',a='start')=>`<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${s}</text>`;
 const path=(d,c='metal')=>`<path d="${d}" class="${c}"/>`;
 const box=(x,y,w,h,c='metal',r=4)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${c}"/>`;
 const circ=(x,y,r,c='metal')=>`<circle cx="${x}" cy="${y}" r="${r}" class="${c}"/>`;
 const ellipse=(x,y,rx,ry,c='metal')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" class="${c}"/>`;
 const points=(x,y,r,n=6)=>Array.from({length:n},(_,i)=>{let a=(i*360/n-30)*Math.PI/180;return `${x+Math.cos(a)*r},${y+Math.sin(a)*r}`}).join(' ');
 const hex=(x,y,r=12,type='head')=>`<polygon points="${points(x,y,r)}" class="bolt"/>${type==='nut'?circ(x,y,r*.35,'hole'):''}`;
 const tag=(x,y,s)=>text(x,y,s,'key','middle');
 const castle=(x,y,key='',r=15)=>hex(x,y,r,'nut')+path(`M${x-r*.72} ${y-r*.55}V${y-r*1.02} M${x} ${y-r*.55}V${y-r*1.02} M${x+r*.72} ${y-r*.55}V${y-r*1.02}`,'fine')+(key?tag(x,y-r-7,key):'');
 const bolt=(x,y,key='',r=12)=>hex(x,y,r)+ (key?tag(x,y-r-7,key):'');
 const nut=(x,y,key='',r=12)=>hex(x,y,r,'nut')+(key?tag(x,y-r-7,key):'');
 const lead=(x,y,tx,ty,s,detail='')=>circ(x,y,3,'target')+path(`M${x} ${y}L${tx-16} ${y}L${tx-16} ${ty-5}`,'lead')+text(tx,ty,s)+(detail?text(tx,ty+21,detail,'sub'):'');
 const arrow=(x1,y1,x2,y2,both=false)=>`<path d="M${x1} ${y1}L${x2} ${y2}" class="motion" marker-end="url(#arr)" ${both?'marker-start="url(#arr)"':''}/>`;
 const axleNut=(x,y,r=34)=>{let p=Array.from({length:24},(_,i)=>{let a=i*Math.PI/12,q=i%2?r*.86:r;return `${x+Math.cos(a)*q},${y+Math.sin(a)*q}`}).join(' ');return `<polygon points="${p}" class="bolt"/>${circ(x,y,r*.40,'hole')}`};
 const studs=(x,y,r=54,nuts=false)=>Array.from({length:5},(_,i)=>{let a=(-90+i*72)*Math.PI/180,p=x+Math.cos(a)*r,q=y+Math.sin(a)*r;return nuts?nut(p,q,'',8):circ(p,q,5,'stud')}).join('');
 const hub=(x,y,r=70,clamped=false)=>circ(x,y,r,'hub')+circ(x,y,r*.72,'metal')+studs(x,y,r*.65)+circ(x,y,21,'hole')+(clamped?axleNut(x,y,22):circ(x,y,15,'spline'));
 const knuckle=(x,y)=>path(`M${x-42} ${y-73}L${x-22} ${y-105}H${x+29}L${x+51} ${y-67}L${x+73} ${y-24}L${x+103} ${y+4}V${y+34}L${x+64} ${y+45}L${x+38} ${y+100}H${x-29}L${x-50} ${y+56}L${x-88} ${y+22}L${x-82} ${y-37}Z`);
 const ball=(x,y,retained=true)=>box(x-9,y-28,18,30,'metal')+(retained?castle(x,y-24,'',11)+path(`M${x-16} ${y-24}H${x+17}L${x+23} ${y-17}`,'motion'):'')+path(`M${x-25} ${y+4}Q${x-27} ${y-6} ${x-14} ${y-10}H${x+14}Q${x+27} ${y-6} ${x+25} ${y+4}V${y+24}H${x-25}Z`,'boot')+box(x-37,y+23,74,14,'metal');
 const caliper=(x,y)=>box(x-10,y-75,29,151,'hub')+path(`M${x+15} ${y-69}H${x+52}L${x+67} ${y-45}V${y+43}L${x+50} ${y+67}H${x+16}Z`,'caliper')+box(x+18,y-30,20,60,'pad');
 const style=`<style>text{font-family:Arial,Helvetica,sans-serif;fill:#253d4d;font-size:16px}.label{font-size:16px;font-weight:700}.sub{font-size:14px;fill:#4d6678}.small{font-size:13px;fill:#566f80}.key{font-size:14px;font-weight:800;fill:#98490e}.metal{fill:#e5ebef;stroke:#50697b;stroke-width:2;stroke-linejoin:round}.hub{fill:#cbdfe9;stroke:#3f6579;stroke-width:2.5}.caliper{fill:#b8d3e0;stroke:#3f6579;stroke-width:2.5}.pad{fill:#667885;stroke:#405769;stroke-width:2}.strut{fill:#aebec7;stroke:#50697b;stroke-width:2.5}.boot{fill:#d7e8e8;stroke:#497270;stroke-width:2}.bolt{fill:#ffd3a3;stroke:#a65d20;stroke-width:2}.stud{fill:#7a8d9a;stroke:#435b6b;stroke-width:1.3}.hole{fill:#fff;stroke:#50697b;stroke-width:1.6}.spline{fill:#edf3f5;stroke:#4e6979;stroke-width:3;stroke-dasharray:2 3}.target{fill:#087d7c}.teal{fill:#c9ebe4;stroke:#087d7c;stroke-width:2}.lead{fill:none;stroke:#6f8795;stroke-width:1.3}.fine{fill:none;stroke:#597384;stroke-width:1.5}.motion{fill:none;stroke:#087d7c;stroke-width:3}.ghost{fill:none;stroke:#91a6b3;stroke-width:1.8;stroke-dasharray:6 5}.axis{fill:none;stroke:#9dabb5;stroke-width:1;stroke-dasharray:9 5}.hose{fill:none;stroke:#485965;stroke-width:5}.hanger{fill:none;stroke:#087d7c;stroke-width:4}.warning{fill:#fff4e4;stroke:#c19a5c;stroke-width:1.5}.panel{fill:#fff;stroke:#d4e0e7;stroke-width:1.2}.red{fill:none;stroke:#b84531;stroke-width:3}.tire{fill:#4f5f6a;stroke:#314a5a;stroke-width:3}</style>`;
 let serial=0;
 function wrap(title,body,view='Connection concept; rotated for clarity. Confirm the actual part and hardware.'){
  const id='motion-'+(++serial);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" role="img" aria-label="${title}"><title>${title}</title><desc>Original schematic, not to scale. ${view} Orange hexagons are bolt heads or nuts; gray round marks are studs. Green arrows show movement, gray leaders label parts.</desc>${style}<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#087d7c"/></marker></defs><rect width="800" height="520" fill="#fbfdfe"/>${text(24,31,title)}${text(24,55,view,'small')}${body.replaceAll('url(#arr)',`url(#${id})`)}</svg>`;
 }
 function strutConnection(x,y,withBolts=true){return box(x-16,y,33,102,'strut',9)+box(x-34,y+92,14,107)+box(x+31,y+92,14,107)+box(x-15,y+116,45,67,'hub')+(withBolts?[y+130,y+169].map((z,i)=>box(x-49,z-4,113,8,'metal',1)+bolt(x-49,z,'',10)+nut(x+65,z,'H'+(i+1),10)).join(''):'')}
 function assembly(state='brakes'){
  if(state==='bench')return bench(false);
  if(state==='final')return wrap('Final assembly · wheel fitted',circ(223,282,146,'tire')+circ(223,282,113,'metal')+circ(223,282,44,'hub')+studs(223,282,76,true)+text(223,477,'A · five wheel nuts · 76 ft·lb','sub','middle')+text(429,126,'Visible: wheel seated on hub')+text(429,155,'Five nuts tightened in a star pattern','sub')+text(429,209,'Hidden checks already completed')+text(429,240,'B: axle torqued and staked before loading','sub')+text(429,271,'C/D/E/F/G/H: audit each connection','sub')+text(429,302,'Sensor + hose routing restored','sub')+text(429,356,'Hub readings + alignment + ABS checks')+text(429,387,'Record actual results in the job sheet','sub'),'Outboard view of a generic wheel; hidden fasteners are checked separately.');
  const brakes=['wheel','brakes','sensor'].includes(state), disconnected=state==='connections', wheel=state==='wheel';
  let b=knuckle(226,297)+box(210,94,32,82,'strut')+box(192,170,17,66)+box(251,170,17,66)+box(209,179,42,50,'hub')+[186,218].map(y=>box(181,y-4,95,8,'metal')+bolt(181,y,'',8)+nut(276,y,'',9)).join('')+ball(226,397)+hub(226,297,66,['wheel','brakes','sensor'].includes(state));
  if(brakes)b+=circ(226,297,110,'ghost')+caliper(336,297);
  if(wheel)b+=`<g opacity=".20">${circ(226,297,144,'tire')}${circ(226,297,113,'metal')}</g>`+text(64,476,'Transparent wheel: locator view only','small');
  const armEnd=disconnected?157:198,tieStart=disconnected?386:326;
  b+=(disconnected?path(`M71 450L${armEnd} 437L${armEnd+14} 457L91 479Z`):path('M71 450L192 435H263L264 454L91 479Z'))+path(`M${tieStart} 326L430 358`,'hose');
  if(!disconnected)b+=box(204,422,6,27,'metal')+box(242,422,6,27,'metal')+box(223,422,6,27,'metal')+nut(207,451,'G1',7)+nut(245,451,'G2',7)+bolt(226,451,'G3',7)+nut(333,332,'F',9);
  else b+=path('M195 425H252 M331 326L358 344','ghost')+text(73,417,'G flange separated','small')+text(350,394,'F stud separated','small');
  b+=lead(276,186,481,108,'H · strut pair ×2','Through-bolts, heads + nuts; 155 ft·lb');
  b+=lead(226,297,481,178,'B · axle nut at hub center','30 mm 12-point; new nut 217 ft·lb');
  b+=lead(333,332,481,354,disconnected?'F · taper released':'F · tie-rod nut + pin','36 ft·lb at reassembly');
  b+=lead(226,451,481,424,disconnected?'G · arm detached from flange':'G · flange: 2 nuts + 1 bolt','55 ft·lb EACH at reassembly');
  b+=box(482,219,292,90,'panel')+box(503,234,22,61)+box(529,238,20,54,'hub')+bolt(505,248,'',7)+bolt(505,279,'',7)+text(567,247,brakes?'C ×2 · inboard access':'C bolts out / brakes off','sub')+text(567,270,'Mounting pair: 79 ft·lb','small')+text(567,292,'See separate brake close-up','small');
  if(state==='refit')b+=text(30,495,'Refit state: suspension retained; brakes are still off.','small');
  return wrap('Front corner · '+({wheel:'wheel on',brakes:'wheel off',sensor:'line protection',bare:'brakes off',connections:'connections separated',refit:'knuckle refit'}[state]||state),b,'Outboard locator + separate inboard C inset; page directions are not vehicle directions.');
 }
 function axle(kind){
  const final=kind==='stake',torque=kind==='axle-torque';
  let b=hub(186,276,105,true)+text(186,412,torque||final?'B · NEW axle nut':'B · OLD axle nut','sub','middle');
  b+=box(415,102,359,273,'panel')+text(432,129,'Collar / groove detail · section concept','sub');
  b+=box(435,237,313,50)+path('M435 262H748','axis');
  for(let i=0;i<12;i++)b+=path(`M${470+i*20} 237L${461+i*20} 248 M${470+i*20} 276L${461+i*20} 287`,'fine');
  b+=box(542,184,45,125,'metal')+box(578,246,133,9,'hole');
  b+=final?path('M587 215H604V247L596 254L587 247Z','bolt'):path('M587 215H604V239H587Z','bolt');
  b+=lead(649,250,435,333,'Axle locking groove','Longitudinal groove; protect threads');
  if(final)b+=arrow(634,208,604,241)+text(432,397,'NEW collar visibly enters the groove')+text(432,424,'A dent away from the groove does not lock','sub')+text(432,451,'Stake only after torque and hub checks','sub');
  else if(torque)b+=text(432,397,'New collar still unstaked after torque')+text(432,424,'294 N·m / 217 ft·lb; brakes hold hub','sub')+text(432,451,'Wheel stays unloaded; measure, then stake','sub');
  else b+=arrow(597,263,624,203)+text(432,397,'Lift OLD collar entirely clear of groove')+text(432,424,'Then loosen; do not force over the stake','sub')+text(432,451,'Old nut is discarded after removal','sub');
  b+=text(24,494,'Inset shows a concept, not a required chisel angle or a dimensional thread profile.','small');
  return wrap(final?'Axle nut · completed stake':torque?'Axle nut · new nut torqued, unstaked':'Axle nut · released old collar',b,'Front hub + magnified side detail; shape must be matched to the actual nut/axle.');
 }
 function brake(hanging=false){
  if(hanging){let b=box(71,164,75,232,'ghost')+text(52,434,'Knuckle stays on car','small')+caliper(251,277)+path('M285 211L312 140Q327 116 307 115','hanger')+box(280,98,67,16,'metal')+path('M302 237C426 203 431 388 552 276','hose')+bolt(590,395,'C1',13)+bolt(638,395,'C2',13);
   b+=lead(312,140,471,125,'Secure hanger carries weight','Verify its fixed attachment separately')+lead(425,292,471,229,'Brake hose stays slack','Hydraulic union remains closed')+lead(271,278,471,307,'Caliper + bracket + pads together','No mounting C bolts remain installed')+text(544,437,'C ×2 bolts in labeled tray','sub');
   return wrap('Brake assembly · removed and hanging',b,'Separated assembly state; hose and hanger are distinct paths.');}
  let b=box(177,141,76,270)+box(259,165,38,217,'hub')+caliper(307,274);
  [190,352].forEach((y,i)=>b+=box(151,y-4,143,8,'metal',1)+bolt(149,y,'C'+(i+1),13)+path(`M257 ${y-10}V${y+10}`,'fine'));
  b+=bolt(356,211,'slide',8)+bolt(356,337,'slide',8);
  b+=lead(230,190,462,130,'C mounting path ×2','Head, shaft, bracket and knuckle interface')+lead(232,352,462,204,'C: 107 N·m / 79 ft·lb','17 mm observed; fit actual hardware')+lead(356,211,462,279,'Slide-pin bolts: different connection','14 mm observed; leave assembled')+lead(334,274,462,354,'Bracket + pads + caliper','Lift as a complete assembly');
  return wrap('Brake mounting · identify the correct pair',b,'Inboard connection section, rotated to reveal interfaces; not a casting drawing.');
 }
 function lower(){
  let b=box(199,107,94,74)+box(238,144,18,77)+castle(247,134,'retained',13)+path('M227 134H269L281 141','motion')+ball(247,220,false);
  b+=box(141,279,215,20,'hub')+path('M124 326H373L393 347H101Z');
  [169,248].forEach((x,i)=>b+=box(x-4,290,8,80,'metal',0)+nut(x,376,'G'+(i+1),13));
  b+=box(331,291,8,72,'metal',0)+bolt(335,376,'G3',13);
  b+=path('M126 310H375','axis');
  b+=lead(248,300,467,128,'Flange to arm: THREE connections','Separated section for recognition')+lead(169,376,467,203,'G1 + G2: two stud nuts','Shafts cross BOTH mating layers')+lead(335,376,467,278,'G3: one bolt','75 N·m / 55 ft·lb at EACH location')+lead(247,135,467,353,'Tapered-stud nut stays installed','Its separate nut/locking pin are undisturbed');
  b+=text(24,464,'Upper layer = ball-joint flange. Lower layer = outer control arm.','small')+text(24,491,'Pattern spread for clarity; match the actual underside fasteners, not these coordinates.','small');
  return wrap('Lower ball joint · three flange fasteners',b,'Layer section, not bolt-pattern coordinates. Green boot is not a pry/support contact.');
 }
 function tie(separator=false){
  let b=path('M76 353H201','hose')+ellipse(258,352,49,38,'boot')+box(251,204,14,132)+box(194,250,153,30)+castle(258,229,'F',17);
  if(!separator)b+=path('M231 229H287L300 240 M231 229L216 239','motion')+text(444,112,'Castle nut + NEW cotter pin')+text(444,140,'49 N·m / 36 ft·lb, then pin','sub')+text(444,196,'Slots miss hole? Tighten up to 60°')+text(444,224,'Never back off to align the pin','sub');
  else{b+=path('M176 299H357V122H312 M176 299V122H209','ghost')+box(248,142,20,70,'metal')+box(204,280,22,19,'metal')+box(324,280,23,19,'metal')+arrow(258,178,258,212)+arrow(320,311,320,282)+text(444,112,'Cotter pin REMOVED')+text(444,140,'Nut loosened, retained if tool permits','sub')+text(444,195,'Screw centered on protected stud')+text(444,223,'Jaws react on solid steering arm','sub')+text(444,414,'Contact concept, not a model-specific tool','small');}
  b+=lead(258,207,444,283,'Stud axis through steering arm','Keep tool off the rubber boot')+lead(130,353,444,355,'Tie-rod link to steering rack','Keep rack-end adjustment unchanged')+text(24,490,'Generic section: match your separator’s permitted contacts and retention instructions.','small');
  return wrap(separator?'Tie-rod taper · separator contact pair':'Tie rod · taper, castle nut and pin',b,'Taper section; protected stud and solid arm are the tool reaction pair.');
 }
 function strutView(alignment=false){
  let b=strutConnection(220,100,false)+path('M207 219H248V360L277 413H179L207 350Z','hub');
  [230,269].forEach((y,i)=>b+=box(172,y-4,112,8,'metal',1)+bolt(172,y,'',10)+nut(284,y,'H'+(i+1),11));
  b+=path('M204 251L216 239L235 257','motion');
  b+=lead(225,236,443,125,'Knuckle between clevis ears','Both bolts pass horizontally through joint')+lead(284,230,443,201,'H upper + H lower nuts','Counterhold heads; 210 N·m / 155 ft·lb')+lead(219,249,443,277,'Witness marks across interface','Record bolt direction and camber hardware');
  if(alignment)b+=path('M222 334L246 366L253 412','ghost')+arrow(209,373,253,373,true)+text(443,357,'Joint movement can change camber')+text(443,384,'Paint marks are not an alignment measure','sub');
  else b+=text(443,357,'Keep bolts inserted until supported')+text(443,384,'Remove upper last during disassembly','sub');
  b+=text(24,490,'Only lower H connection opens. Spring, upper mount and center nut remain intact.','small');
  return wrap(alignment?'Strut joint · alignment consequence':'Strut joint · clevis, heads and nuts',b,'Connection section; all geometry stays below the heading band.');
 }
 function cv(kind){
  let refit=kind==='cv-refit';
  let b=box(63,246,143,30)+path('M201 229L213 216L225 231L237 216L249 231L260 217L274 234V288L260 302L249 289L237 302L225 289L213 302L201 288Z','boot')+box(273,247,102,29,'spline')+box(362,165,35,206,'hub')+box(355,205,129,22,'hub')+box(355,310,129,22,'hub')+box(108,277,67,18,'teal')+path('M110 295L142 342L174 295','hanger')+path('M54 261H489','axis');
  b+=text(52,126,'INBOARD / transaxle','sub')+text(369,126,'OUTBOARD / wheel','sub');
  b+=lead(140,284,518,156,refit?'Keep metal shaft supported':'Support metal BEFORE release','Never on rubber boot / clamp / rotor');
  b+=lead(237,221,518,233,'CV boot and outboard joint','Keep normal alignment; inner joint stays in');
  if(refit)b+=arrow(444,405,338,405)+text(518,316,'REFIT: knuckle/hub slides INBOARD')+text(518,343,'Engage clean splines by hand','sub')+text(518,389,'Both H bolts retain it before support off','sub');
  else b+=arrow(346,405,279,405)+arrow(376,434,452,434)+text(518,316,'RELEASE: axle stub → INBOARD')+text(518,343,'Supported knuckle moves OUTBOARD','sub')+text(518,389,'H upper stays engaged until controlled','sub');
  b+=text(24,488,'Support contact shown on metal only; its permitted anchor/rigging must be verified separately.','small');
  return wrap(refit?'CV / hub · conditional refit':kind==='knuckle-out'?'Knuckle out · two controlled movements':'CV stub · supported release',b,'Side section. Green arrows show movement, not pressing force or tool contacts.');
 }
 function abs(kind){
  if(kind==='sensor'){
   let b=box(130,170,118,229)+path('M225 229H345V275H245Z','metal')+ellipse(246,289,24,39,'hole')+box(236,279,94,20,'teal')+box(312,257,51,64,'teal')+bolt(327,255,'D',10)+path('M363 290C385 314 411 302 430 326','hanger')+path('M258 289H491','axis');
   b+=box(425,267,51,47,'ghost')+arrow(356,371,449,371);
   b+=lead(327,255,521,125,'D · single mounting bolt','8 N·m / 71 in·lb at refit')+lead(248,286,521,206,'Sensor shaft in machined bore','Body withdraws along its bore axis')+lead(392,310,521,287,'Cable is NOT a pull handle','Remove by body, keep tip clean')+text(521,375,'Ghost = sensor removed')+text(24,477,'No levering on the tip; if the body is seized, stop for a sensor-safe method.','small');
   return wrap('ABS sensor · body, bore and extraction axis',b,'Side/oblique recognition detail; actual bore angle varies with casting view.');
  }
  const refit=kind==='abs-refit';let b=box(188,105,41,181,'strut',9)+box(222,194,34,27,'metal')+box(refit?225:262,188,75,42,'metal')+(refit?bolt(247,207,'E',11):bolt(310,152,'E removed',11));
  b+=path(refit?'M275 223C365 255 379 338 315 386':'M312 217C410 269 426 368 390 413','hose');
  b+=path(refit?'M259 220C299 260 267 309 240 358':'M282 220C367 266 347 322 279 385','hanger');
  b+=box(211,339,73,33,'teal')+bolt(254,339,'D',9);
  b+=refit?box(250,278,29,13,'metal'):path('M263 287V273H285','ghost');
  b+=lead(refit?247:310,refit?207:152,456,125,refit?'E · bracket restored':'E · bracket released','19 N·m / 14 ft·lb at refit')+lead(refit?351:397,286,456,215,'Thick gray path = brake hose','Hydraulic union stays closed')+lead(refit?267:344,298,456,305,'Thin green path = ABS wire','Clips '+(refit?'closed in original retainers':'released; route clear'))+lead(254,339,456,394,'D · sensor body at knuckle','Refit flush, then small bolt torque');
  b+=text(24,490,refit?'Check hose/wire slack through steering travel after clips and bracket are restored.':'Bracket is detached before knuckle movement; keep slack, no line bears component weight.','small');
  return wrap(refit?'ABS + hose · routing restored':'ABS + hose · bracket and clips released',b,'Routing concept; restore the actual photographed route, not this page layout.');
 }
 function rotor(check=false){
  let b=circ(231,284,132,'metal')+circ(231,284,112,'hub')+circ(231,284,65,'metal')+studs(231,284,52,check)+circ(231,284,25,'hole');
  if(check)b+=path('M355 221L480 177','fine')+box(320,270,62,16,'metal')+circ(388,278,25,'hole')+path('M375 278H332','fine');
  else b+=circ(164,284,6,'teal')+circ(298,284,6,'teal');
  b+=path('M231 175V232','motion');
  b+=lead(231,232,464,122,'Mark rotor relative to one stud','Re-clock only with re-clamp + remeasurement');
  if(check)b+=lead(331,278,464,207,'Probe on friction face, near outer edge','10 mm inside actual edge; face-normal')+lead(201,326,464,285,'Five temporary nuts: 103 N·m / 76 ft·lb','Requires verified compatible holding/seats');
  else b+=lead(298,284,464,207,'Release holes if present','Measure actual thread; never force bolts');
  b+=lead(108,284,464,365,'Broad shield behind rotor','Leader lands outside the friction disc')+text(24,485,check?'Probe / clamp relationship shown; this drawing does not specify a substitute fixture.':'After caliper removal, rotor pulls outboard along the studs. Keep friction surfaces clean.','small');
  return wrap(check?'Rotor · clamped measurement relationship':'Rotor · pilot, stud mark and broad shield',b,'Outboard recognition view; probe axis is normal to the face (see measurement section).');
 }
 function bench(ready=false){
  let b=text(70,110,'OUTBOARD / wheel face','sub')+text(472,110,'INBOARD / axle face','sub')+knuckle(211,266)+circ(211,266,102,'ghost')+hub(211,266,66)+ball(211,373)+knuckle(594,266)+circ(594,266,72,'hub')+circ(594,266,48,'hole')+path('M643 210L665 188H685V219L659 228Z','teal')+path('M579 194A75 75 0 0 1 619 195','ghost')+ball(594,373);
  b+=lead(211,266,56,452,'Hub + five studs','Bearing hidden behind flange')+lead(657,206,464,452,'New deflector opening aligned','Sensor boss / hole must stay clear');
  b+=text(50,160,'Brake shield behind hub','small')+text(476,160,'Bearing / deflector annulus','small')+text(80,416,'Attached ball joint + boot','small')+text(484,416,'Retained stud nut stays secured','small');
  b+=box(321,107,116,101,'warning')+text(334,130,ready?'RESUME ONLY':'BENCH CHECK','small')+text(334,154,'New bearing','small')+text(334,176,'New ring*','small')+text(334,198,'New deflector','small');
  b+=text(24,504,ready?'*Ring may be hidden after assembly: verify installation record and full seating before resuming.':'Identify both faces and confirm tool contacts before bench extraction.','small');
  return wrap(ready?'Bench → refit · complete-assembly prerequisites':'Bench · recognize both faces of removed knuckle',b,'Simplified dual-view recognition; not a disassembly order or exact casting outline.');
 }
 function meter(setup=false){
  let b='';
  function panel(x,label,probeY){
   let p=box(x,95,360,310,'panel')+text(x+15,121,label,'sub')+box(x+135,180,18,164,'hub')+box(x+145,245,55,20,'metal')+box(x+189,238,16,34,'bolt')+box(x+43,247,102,16,'metal')+path(`M${x+24} 255H${x+321}`,'axis')+box(x+281,145,29,71,'strut')+path(`M${x+294} 214V${probeY-32}H${x+269}`,'fine')+circ(x+265,probeY-20,25,'hole')+path(`M${x+260} ${probeY-20}L${x+272} ${probeY-34}`,'motion')+box(x+174,probeY-4,95,8,'metal')+path(`M${x+174} ${probeY}H${x+154}`,'fine');
   p+=text(x+20,365,'B nut installed / torqued','small')+text(x+20,387,'Fixture on stationary strut','small');return p;
  }
  b+=panel(24,'1. AXIAL PLAY · near center',282)+panel(416,'2. FACE RUNOUT · outside studs',199);
  b+=arrow(97,427,191,427,true)+text(46,459,'Push / pull ALONG axle axis','sub')+path('M557 436A26 26 0 1 1 577 456','motion')+`<path d="M557 436L563 426" class="motion" marker-end="url(#arr)"/>`+text(451,477,'Rotate 360° WITHOUT axial push / pull','sub');
  b+=text(24,503,setup?'Expose bare hub after nut torque; set stable mount with magnet away from sensor/hub.':'Both plungers face-normal / axle-parallel. Record total movement and the verified VIN limit.','small');
  return wrap(setup?'Measurement setup · torqued axle, bare hub':'Hub checks · two separate probe positions',b,'Side sections: vertical blue plate is hub face; horizontal axis is axle direction.');
 }
 function supports(){let b=knuckle(208,279)+hub(208,279,64)+box(184,351,47,13,'teal')+text(56,338,'Casting contact highlighted','small')+box(476,251,151,26)+path('M627 238L640 225L655 240L669 225L680 240V290L669 304L655 290L640 304L627 290Z','boot')+box(505,278,90,18,'teal')+path('M506 296L550 345L594 296','hanger');
  b+=text(54,117,'KNUCKLE: substantial casting only','sub')+text(462,117,'AXLE: rigid metal support before release','sub')+text(53,380,'No contact on shield, studs, sensor or boot','small')+text(462,380,'No support on rubber boot / clamp / rotor','small')+box(35,413,730,69,'warning')+text(51,439,'Support concepts, not verified anchors')+text(51,464,'Use approved retained equipment or a helper; test before releasing H / G connections.','sub');
  return wrap('Handling support · identify what can carry weight',b,'Part contact concepts only. No car sling anchor, saddle position or load rating is invented.');}
 function support(){let b=path('M72 272H204L228 310H60Z')+circ(81,310,15)+circ(208,310,15)+path('M123 269L181 216','fine')+box(175,198,40,13,'teal')+path('M355 325L403 232L451 325Z')+box(385,208,35,22,'teal')+path('M550 318H650L634 277H567Z')+text(62,363,'FLOOR JACK','sub')+text(347,363,'RATED STAND + LOCK','sub')+text(539,363,'REAR-WHEEL CHOCKS','sub')+box(36,101,728,82,'warning')+text(53,128,'No vehicle lifting coordinates are shown')+text(53,153,'Owner floor-jack figure ≠ separate Toyota safety-stand/support figure','sub')+text(52,428,'Match BOTH points on the exact vehicle before lifting')+text(52,455,'Verify saddle fit, contact condition, capacity and stability','sub')+text(25,493,'Required service path: 2011 Camry → Introduction → Vehicle Lift and Support Locations.','small');return wrap('Lifting equipment · required contact verification',b,'Equipment recognition only. This figure cannot authorize a jack or stand position.');}
 function star(){let b=circ(226,280,151,'tire')+circ(226,280,119)+circ(226,280,34,'hub'),pts=[];for(let i=0;i<5;i++){let a=(-90+i*72)*Math.PI/180;pts.push([226+Math.cos(a)*86,280+Math.sin(a)*86]);}let order=[0,2,4,1,3];order.forEach((p,i)=>{let[x,y]=pts[p];b+=nut(x,y,'',20)+text(x,y+5,''+(i+1),'label','middle');if(i<4){let[q,r]=pts[order[i+1]];b+=path(`M${x} ${y}L${q} ${r}`,'ghost')}});b+=text(452,133,'A · FIVE wheel nuts')+text(452,172,'103 N·m / 76 ft·lb')+text(452,230,'Hand-start and snug in star order','sub')+text(452,267,'Final torque 1 → 2 → 3 → 4 → 5','sub')+text(452,304,'Dry threads and correct nut seats','sub')+text(452,365,'Axle already torqued + staked','sub')+text(452,393,'before wheel takes vehicle weight','sub');return wrap('Wheel · star sequence and five-nut audit',b,'Generic wheel, outboard view. Nut seat shape must match your actual wheel.');}
 function tools(){let b=box(68,139,76,141)+ellipse(106,139,38,15)+`<polygon class="spline" points="${Array.from({length:24},(_,i)=>{let a=i*Math.PI/12,r=i%2?20:26;return `${106+Math.cos(a)*r},${139+Math.sin(a)*r*.45}`}).join(' ')}"/>`+box(80,270,52,34)+box(231,155,65,28)+path('M263 183V368','hose')+box(246,363,34,74,'strut')+circ(407,171,24)+path('M407 195V387','hose')+box(390,380,34,59,'teal')+circ(591,231,19)+path('M591 250L679 358','hose')+box(661,348,57,25,'teal');
  b+=text(38,338,'30 mm DEEP 12-point','sub')+text(46,361,'Square drive at base','small')+text(224,464,'Breaker bar','sub')+text(347,464,'High / middle torque','sub')+text(562,405,'Small-range torque','sub')+text(524,129,'CHECK ALL USABLE RANGES')+text(524,159,'71 in·lb ≠ 71 ft·lb','sub')+text(524,184,'14 and 36 ft·lb need coverage too','small')+text(24,504,'Recognition silhouettes; use actual drive, calibration, grip and setting instructions.','small');return wrap('Your tools · drive depth and torque ranges',b,'Tool identity and purpose; no pressing kit or model is assumed.');}
 function make(kind){if(kind==='bench-joint')return lower().replaceAll('Lower ball joint · three flange fasteners','Bench ball joint · J versus G').replaceAll('retained','J').replace('Tapered-stud nut stays installed','J: separate tapered-stud nut').replace('Its separate nut/locking pin are undisturbed','Service J in the bench chapter');if(['axle','axle-torque','stake'].includes(kind))return axle(kind);if(['brake','hanger'].includes(kind))return brake(kind==='hanger');if(['tie','separator'].includes(kind))return tie(kind==='separator');if(kind==='lower')return lower();if(['strut','alignment'].includes(kind))return strutView(kind==='alignment');if(['cv','knuckle-out','cv-refit'].includes(kind))return cv(kind);if(['abs','sensor','abs-refit'].includes(kind))return abs(kind);if(['rotor','rotor-check'].includes(kind))return rotor(kind==='rotor-check');if(['bench','stack'].includes(kind))return bench(kind==='stack');if(['meter','meter-setup'].includes(kind))return meter(kind==='meter-setup');if(kind==='support')return support();if(kind==='supports')return supports();if(kind==='tools')return tools();if(kind==='star')return star();return assembly(kind==='wheel'?'wheel':kind==='final'?'final':'brakes');}
 return {make,assembly};
})();
