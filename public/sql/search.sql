select doctor_id,name.name_ch as name,doctor_profession from doctor natural join name 
where doctor_faculty='心血管内科' and doctor_political='主任';

select doctor_faculty,name_ch from `doctor` where hospital_id in 
( select hospital_id from `hospital` where hospital_name= '北京大学首钢医院') order by doctor_faculty;

select doctor_id,name.name_ch as name,doctor_profession from `doctor` natural join `name` 
where doctor_political= '院长' and doctor_faculty= '肝胆外科 ';