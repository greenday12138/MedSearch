LOAD DATA LOCAL INFILE 'D:\Git\MedSearch\public\data\temp.csv'
INTO TABLE city
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname)
values('于成庄','yuchengzhuang','yu','y','chengzhuang','cz');
insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) values
('00302508','眼科','主任医师','副主任','白内障、青光眼、眼底疾病等眼科常见病、疑难病的诊治',
'于成庄，女，主任医师，科副主任，毕业于哈尔滨医科大学。从事眼科工作近30年，撰写论文数十篇。1987年在北京人民医院进修学习，积累了丰富的临床经验，擅长眼外伤，青光眼，白内障，眼底疾病的诊断和治疗。',
'正常','59086355','于成庄');

insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname)
values('付广双','fuguangshuang','fu','f','guangshuang','gs');
insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) values
('01024417','感染科','主任医师','主任','各种感染性疾病的诊断、治疗，尤其在病毒性肝炎、肝硬化、肾综合征出血热、艾滋病、各种呼吸道传染性疾病等治疗方面有丰富临床经验。',
'付广双，女，主任医师，感染科主任，1990年毕业于白求恩医科大学医疗专业，医学硕士，吉林省医师协会肝病医师分会副主任委员，吉林省医师协会感染医师分会副主任委员，中华医学会吉林省医学会传染病学专科分会常委，吉林省医学会肝病学分会常委，长春市医学会医疗事故技术鉴定专家库成员，从事传染病专业20余年，擅长各种感染性疾病的诊断、治疗，尤其在病毒性肝炎、肝硬化、肾综合征出血热、艾滋病、各种呼吸道传染性疾病等治疗方面有丰富临床经验。对核苷类似物治疗慢性乙型肝炎HBV变异的研究处于省内领先地位 。发表省级以上学术论文10余篇 。组织、参与科研项目六项，其中一项为吉林省自然科学基金项目，二项分别获吉林省、集团公司科技 进步三等奖。',
'正常','99996031','庄光雄');

insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname)
values('刘壮昌','liuzhuangchang','liu','l','zhuangchang','zc');
insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) values
('00118329','眼科','副主任医师 副教授','主任','白内障、青光眼、眼底病、儿童斜视弱视等眼病的诊治',
'刘壮昌，男，副主任医师，副教授，眼科主任，1990年7月毕业于山东临沂医学专科学校，大专学历。从事眼科专业20余年，主要擅 长眼科领域中的屈光方面的诊疗，特别是近视及白内障手术及儿童斜弱视诊疗，对青光眼、眼外伤、眼底病的诊治有丰富经验。参与科研2项及专利四项，专著一部，发表国家级学术论文20余篇。',
'正常','99592536','庄光雄');

insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname)
values('刘成双','liuchengshuang','liu','l','chengshuang','cs');
insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) values
('00042815','神经外科','主任医师','副院长, 副主任','骨科和神经外科常见病及多发病的诊断和治疗,颅内各部位肿瘤的诊断和手术治疗;高血压脑出血的微创手术治疗,三叉神经疼及面肌痉挛的手术治疗.颅内动脉瘤的诊断和手术治疗',
'刘成双，男，主任医师，于１９８１年８月毕业于济宁医学院分配到兖州道沟乡卫生院从事临床工作，８４年任卫生院业务副院长 ，８５年加入中国共产党，８５年８６年分别被评为县人大代表和党代表。１９８７年１１月调到兖州市人民医院外科先后从事骨科及神经外科临床工作，１９９２年７月－１９９３年７月在山东省省立医院神经外科进修学习，师从于王学庆、宋玉喧教授。１９９３年６月－１９９６年６月在济宁医学院临床医学系学习获本科学历。１９９３年４月被评为外科主治医师，１９９９年１２月晋升为神经外科副主任医师。２００７年４月－２００７年６月在首都医科大学宣武医院Samii颅底外科训练中心学习，师从于著名神经外科专家凌锋教授 。2007年底晋升为主任医师,2008年底被聘任为主任医师.擅长骨科和神经外科常见病及多发病的诊断和治疗,颅内各部位肿瘤的诊断和手 术治疗;高血压脑出血的微创手术治疗,三叉神经疼及面肌痉挛的手术治疗.颅内动脉瘤的诊断和手术治疗.在抢救各种重症颅脑外伤方面有比较丰富的经验.几年来撰写医学专著4部,国家级医学杂志发表医学论文10余篇. ２００７年１月及2008年5月各获中华人民共和国国家知识产权局受理的实用新型专利及发明型专利一项.2004年以来被医院评为神经外科学科带头人.2006年出国考察学习一次；多次评为先进工作者及优秀共产党员.',
'正常','26192285','庄光雄');

insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname)
values('庄光雄','zhuangguangxiong','zhuang','z','guangxiong','gx');
insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) values
('00238048','普外科','副主任医师','副院长','对外科常见病、多发病、疑难病症有丰富的诊疗经验，尤其擅长普外科疾病及肿瘤疾病的诊断和治疗，为我院腹腔镜手术创始人。',
'庄光雄，男，副主任医师，副院长，市普外科学会常委，市抗癌协会常务理事，市肿瘤康复协会副会长，1985年毕业于三峡大学，从事外科临床工作21年，曾在武汉协和医院、西安、广东等地进修学习，曾先后撰写论文多篇参加全国性学术交流或发表。专业特长：对外科常见病、多发病、疑难病症有丰富的诊疗经验，尤其擅长普外科疾病及肿瘤疾病的诊断和治疗，为我院腹腔镜手术创始人。',
'正常','11442476','庄光雄');

insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname)
values('张相双','zhangxiangshuang','zhang','z','xiangshuang','xs');
insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) values
('00915504','脑外科','副主任医师','副院长','颅脑损伤及中枢神经系统疾 病的诊治。',
'张相双，男，副主任医师，副院长，安徽医科大学副教授，滁州市医学会副秘书长，滁州市神经外科专业委员会主任委 员。87年毕业于皖南医学院医疗系，91年在安徽医科大学附院神经外科进修学习。2005年东南大学在职硕士研究生毕业。擅长颅脑损伤及中枢神经系统疾病的诊治。',
'正常','88316402','张相双');

insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname)
values('徐传庄','xuchuanzhuang','xu','x','chuanzhuang','cz');
insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) values
('00364661','针灸推拿科','副主任医师','副主任','三叉神经，坐骨神经痛 ，腰椎间盘突出症，慢性肠胃炎，十风后遗症，尿失禁，痛经，带状疱疹等病症的治疗',
'徐传庄(已退休)，男，连云港市中医院针灸 科副主任中医师。江苏省针灸学会名誉理事，连云港市针推专业委员会主任委员。从事中医针灸工作29年，为祖国的医学发展，为人民的健康事业作出了一定的贡献，尤其是运用针灸治疗面神经麻痹方法独特，疗效显著，在本市享有较高的声誉。其次对三叉神经，坐骨神经痛，腰椎间盘突出症，慢性肠胃炎，十风后遗症，尿失禁，痛经，带状疱疹等病症的治疗也经常取得奇效。并先后发表《针刺配合委中放血治疗坐骨神经痛96例临床观察》、《面三针治疗面神经麻痹140例临床观察》、《温针灸治疗肩周炎124例临床观察》等多篇论文。',
'正常','92061189','徐传庄');

insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname)
values('徐双城','xushuangcheng','xu','x','shuangcheng','sc');
insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) 
values('00465149','消化科','副主任医师','主任','擅长胃肠道疾病、食管、胃癌 的诊断治疗。',
'1962年郑州医专毕业，濮阳市消化学会名誉主任委员，曾任河南省肝癌专业委员会委员、濮阳市消化学会副主任委员 、总医院消化科主任。',
'正常','36101377','徐双城');

insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) 
values('01417086','骨科','主任医师','主任','颈椎病及骨科创伤',
'丁一凡，男，骨科主任医师，骨科主任，一九八三年毕业于蚌埠医学院医疗系五年制本科，医学学士。专业特长：颈椎病及骨科创伤。\\t\\t\\t\\t\\t        \\r\\n我是丁一凡本人，我要修改简介',
'未知','75350318','丁一凡');

insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname)
values('朱庄升','zhuzhuangsheng','zhu','z','zhuangsheng','zs');
insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) 
values('01417086','心内科','主任医师','副院长, 主任','高血压/先心病及冠心病的诊治。',
'朱庄升，男，心内科主任医师，曾任副院长，江苏省医学会心血管专业组一、二、三、四届委员，常州市医学会常 委及心血管组组长。长期从事心内科的临床、教学及科研工作，对常见及复杂心血管疾病的诊断和甄别具有较强的处理能力，擅长高血压、先心病及冠心病的诊治。编著出版《形形式式现代病》书籍。',
'未知','52987843','朱庄升');

insert into `doctor`(doctor_id,doctor_faculty,doctor_profession,doctor_political,doctor_expertise,
doctor_description,doctor_status,hospital_id,name_ch) 
values('00279679','肿瘤放疗科','擅长各种恶性肿瘤的放射治疗及放疗','主任','各 种恶性肿瘤的放射治疗及放射增敏的化学药物治疗，脑胶质瘤、脑转移瘤、肺癌、肝癌、直肠癌、妇科恶性肿瘤等进行X-刀治',
'徐慧 云，男，肿瘤内科副主任医师，大学本科学历。毕业于吉林医学院，中国抗癌协会临床肿瘤学协作中心（CSCO）会员。原任吉林省通化矿务局总医院放疗科及X-刀治疗中心主任，曾先后到吉林省肿瘤医院、北京中国医学科学院肿瘤医院进修学习。获得国家级放射治疗及X-刀治疗的上岗资格。擅长各种恶性肿瘤的放射治疗及放射增敏的化学药物治疗，在对脑胶质瘤、脑转移瘤、肺癌、肝癌、直肠癌、妇科恶性肿瘤等进行X-刀治疗方面有丰富经验。2003年作为人才引进我院。',
'正常','64251807','徐慧云'); 