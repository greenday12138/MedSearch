select doctor_id,name.name_ch as name,doctor_profession from doctor natural join name 
where doctor_faculty='心血管内科' and doctor_political='主任';