'use strict';

/**
 * A module that exports the language texts
 * @module translateProvider
 */

/** If need to change any text in the app, that needs to be done here,
 * Also we can add new text here and use that in the app.
 */
module.exports = ['$translateProvider', function($translateProvider) {
    $translateProvider.translations('en', {
        appName: 'Care Giver App',
        editProfile: 'Edit Profile',
        changePassword: 'Change Password',
        logout: 'Logout',
        login: 'Login',
        instruction: 'Instruction',
        language: 'Language',
        english: 'English',
        german: 'German',
        chinese: 'Chinese',
        landline: 'Fixed phone',
        phone: 'Mobile phone',
        contactName: 'Contact Name',
        relationship: 'Relationship',
        contactNumber: 'Contact Number',
        noDeviceText: 'No devices to display',
        noInternetText: 'No connected to internet. Please check you internet connection.',
        mr: 'Mr.',
        mrs: 'Mrs.',
        infoHeader: 'Swiss off "online day care" system description',
        infoParaOneHeader: 'First, the background',
        infoParaOneBody: 'Since 2000, when China entered the aging society, the pace of population aging has obviously accelerated and the development trend is grim. 2015 to 2020 will be a period of rapid population aging in our country. It is estimated that by 2020 China\'s population over the age of 60 will reach 250 million and will reach 300 million by 2025, becoming a super-aged country.',
        infoParaTwoBody: 'To actively cope with the aging population in Shanghai and speed up the sustained and healthy development of the aging cause, the Shanghai municipal government proposed in the 13th Five-year Plan for Development of Aging in Shanghai that the Shanghai municipal government should continue to expand the supply of pension services. One of the four sub-goals is "to further improve the old-age care service based on home-based, community-based, institutional support, and medical support."',
        infoParaThreeBody: 'With the guidance of the streets of Youyi Road, Baoshan District, Baosteel and the specific practice of community work, Baosteel Party Branch and neighborhood committees noticed that both the elderly living alone and their children want to "go home and see regularly", but the reality is that not every Children have the ability, time, energy to do. Since their children and families are busy with their families and work, they are not usually surrounded by the elderly. However, as the elderly grow more and more, they have some health problems. Therefore, day care and attention to the elderly living alone and empty nesters are helping their children to alleviate The burden of supporting the elderly is a point of concern.',
        infoParaTwoHeader: 'Second, the system function',
        infoParaFourBody: 'With the advent of an intelligent society, smart technology and social care services have shown a good situation of integration and development. Let the "Internet +" illuminate the wisdom of the elderly and make the new model of "home care + community assistance" the most popular choice.',
        infoParaFiveBody: 'Baosteel One Village Community first introduced the world-leading, innovative concept Ruike "online daycare" system is the world\'s most minimalist design, use friendly home care services. System based on motion sensing technology, big data analysis and cloud services, self-learning, adaptive daily routine at home for the elderly, after 3 to 4 weeks of learning stage can be the daily routine of the elderly living "deviation or anomaly" Intuitive color information is passed to remote areas in good faith to remind the children or community workers who can not wait for the elderly.',
        infoParaSixBody: 'A thousand miles away, by simply observing the changes in color information, it is possible to "sense" whether the everyday life of the elderly people living alone is all right, without interfering and not affecting the daily life of the elderly. As usual, Signal lights (green / yellow / red) as easy to understand.',
        infoParaSevenBody: 'Swiss off "online day care" system can not be avoided, can not monitor the occurrence of accidents, it is not an emergency help products. For example, if an elderly person falls accidentally in the kitchen or toilet, a fall occurs, and in many cases the elderly can not afford to press for help even though they have a phone or emergency assistance device at home. And according to the research of foreign Alzheimer\'s disease (cognitive disorder) support service center, many seniors also do not have the key to ask for help. In recent years, the media often report that some elderly people living alone were accidentally discovered only after they died many days ago. Swiss off "online day care" system, no doubt can be a good solution to this problem.',
        infoParaThreeHeader: 'Third, the system features',
        infoParaFourHeader: 'Rui off "online day care" system is the biggest characteristic',
        infoParaEightBody: 'Protection of privacy, do not use audio and video surveillance',
        infoParaNineBody: 'Respect the psychological and existing habits, without wearing any equipment',
        infoParaTenBody: 'Power that work, no configuration',
        infoParaElevenBody: 'There is also no need for human intervention during use',
        infoParaTwelveBody: 'Through practice testing and feedback from users, Rui Ke "online daycare" system can help the elderly live in the home for longer and more at ease; to help reduce the anxiety and anxiety of their children, relieve psychological pressure and enhance their sense of well-being; enhance the ability of the elderly, children, The communication between communities has brought unprecedented interaction between the three parties so that the elderly and children can better appreciate the care and warmth of the party, the community and the community and embody the superiority of socialism.',
        infoParaFiveHeader: 'Fourth, Disclaimer',
        infoParaThirteenBody: 'Remind you: Before accepting and using Ritcher\'s "Internet Daycare" system, please be sure to read and thoroughly understand this statement. You may choose not to use Rui Ke, but if you use Rui Ke, your usage will be deemed to be the recognition of the entire contents of this statement.',
        infoParaFourteenBody: 'The responsibility of caring for the elderly lies in the fact that children and communities have introduced the "online daycare" system to better create a good atmosphere of "harmonious community and mutual assistance" and better care for the elderly in the community. This kind of love is not based on obligations, but out of non-reimbursable effort to help children to better care for the elderly within their ability.',
        infoParaFifteenBody: 'Due to the limitation of working hours and staff, the community can not arrange for special attention to Rui Ke "online daycare" system during working hours. The community can only arrange for staff to inspect the system on each working day, identify problems, and provide feedback to their children whenever possible. Children should be more concerned about the care of the elderly, take the initiative to identify problems.',
        infoParaSixteenBody: 'Rui off "online day care" system is a monitoring and early warning system, not emergency products, the information released is more likely, tendentious and judgmental, and can not guarantee 100% certainty of the incident.',
        infoParaSeventeenBody: 'Rui off "online day care" system and can not completely avoid the accident, but can be in the event of an accident, as far as possible the elderly by a faster and more comprehensive treatment.',
        infoParaEightteenBody: 'Finally, I hope Rui Ke will bring luck to the elderly friends and residents and friends at home, feel at ease every day',
        defaultError: 'Something went wrong! Please try again.',
        activateAccount: 'Activate Account',
        email: 'Email',
        emailError: 'Please provide valid email',
        activationCode: 'Activation code',
        activationCodeError: 'Please provide activation code',
        activate: 'Activate',
        forgotPassword: 'Forgot Password',
        home: 'Home',
        oldPassword: 'Current Password',
        oldPasswordError: 'Please provide current password',
        newPassword: 'New Password',
        newPasswordError: 'Please provide new password',
        confirmPassword: 'Confirm Password',
        confirmPasswordError: 'Please confirm password',
        passwordMismatchError: 'Password mismatch',
        change: 'Change',
        name: 'Name',
        nameErrorMessage: 'Please provide valid name',
        save: 'Save',
        submit: 'Submit',
        register: 'Register',
        resetPassword: 'Reset Password',
        password: 'Password',
        passwordError: 'Please provide password',
        signup: 'Signup',
        dob: 'Date of birth',
        address: 'Address',
        male: 'Male',
        female: 'Female',
        projectName: 'IoCare',
        hideDisconnectedText: 'Hide disconnected devices',
        firstname: 'Firstname',
        lastname: 'Lastname',
        roomNumber: 'Room Number',
        gender: 'Gender',
        relative: 'Relative',
        remove: 'Remove',
        addRelative: 'Add Relative',
        device: 'Device',
        deviceType: 'Device type',
        deviceId: 'Device Id',
        contract: 'Contract',
        contractId: 'Contract Id',
        cancel: 'Cancel',
        communityName: 'Community Name',
        noUserError: 'No user data found for you',
        failedUserError: 'Failed to load your user data',
        noContractError: 'No contract found for you',
        invalidContractError: 'Your contract is no longer valid',
        failedContractError: 'Failed to load your contract data',
        noDashboardError: 'No dashboard data found for you',
        failedDashboardError: 'Failed to load your dashboard data',
        noEldersError: 'No caretaker data found for you',
        failedEldersError: 'Failed to load your caretaker data',
        failedDeviceError: 'Failed to load you device data',
        failedPolicy: 'Failed to attach AWS Iot policy'
    });
    $translateProvider.translations('de', {
        appName: 'RICA',
        editProfile: 'Profil bearbeiten',
        changePassword: 'Passwort ändern',
        logout: 'Abmelden',
        login: 'Anmeldung',
        instruction: 'Anleitung',
        language: 'Sprache',
        english: 'Englisch',
        german: 'Deutsch',
        chinese: 'Chinesisch',
        landline: 'Festnetztelefon',
        phone: 'Mobiltelefon',
        contactName: 'Name des Ansprechpartners',
        relationship: 'Beziehung',
        contactNumber: 'Telefonnummer des Ansprechpartners',
        noDeviceText: 'Keine Geräte gefunden',
        noInternetText: 'Keine Internetverbindung. Bitte überprüfen Sie Ihre Internetverbindung.',
        mr: 'Herr',
        mrs: 'Frau',
        infoHeader: 'RICA Systembeschreibung',
        infoParaOneHeader: 'Zuerst der Hintergrund',
        infoParaOneBody: 'Since 2000, when China entered the aging society, the pace of population aging has obviously accelerated and the development trend is grim. 2015 to 2020 will be a period of rapid population aging in our country. It is estimated that by 2020 China\'s population over the age of 60 will reach 250 million and will reach 300 million by 2025, becoming a super-aged country.',
        infoParaTwoBody: 'To actively cope with the aging population in Shanghai and speed up the sustained and healthy development of the aging cause, the Shanghai municipal government proposed in the 13th Five-year Plan for Development of Aging in Shanghai that the Shanghai municipal government should continue to expand the supply of pension services. One of the four sub-goals is "to further improve the old-age care service based on home-based, community-based, institutional support, and medical support."',
        infoParaThreeBody: 'With the guidance of the streets of Youyi Road, Baoshan District, Baosteel and the specific practice of community work, Baosteel Party Branch and neighborhood committees noticed that both the elderly living alone and their children want to "go home and see regularly", but the reality is that not every Children have the ability, time, energy to do. Since their children and families are busy with their families and work, they are not usually surrounded by the elderly. However, as the elderly grow more and more, they have some health problems. Therefore, day care and attention to the elderly living alone and empty nesters are helping their children to alleviate The burden of supporting the elderly is a point of concern.',
        infoParaTwoHeader: 'Second, the system function',
        infoParaFourBody: 'With the advent of an intelligent society, smart technology and social care services have shown a good situation of integration and development. Let the "Internet +" illuminate the wisdom of the elderly and make the new model of "home care + community assistance" the most popular choice.',
        infoParaFiveBody: 'Baosteel One Village Community first introduced the world-leading, innovative concept Ruike "online daycare" system is the world\'s most minimalist design, use friendly home care services. System based on motion sensing technology, big data analysis and cloud services, self-learning, adaptive daily routine at home for the elderly, after 3 to 4 weeks of learning stage can be the daily routine of the elderly living "deviation or anomaly" Intuitive color information is passed to remote areas in good faith to remind the children or community workers who can not wait for the elderly.',
        infoParaSixBody: 'A thousand miles away, by simply observing the changes in color information, it is possible to "sense" whether the everyday life of the elderly people living alone is all right, without interfering and not affecting the daily life of the elderly. As usual, Signal lights (green / yellow / red) as easy to understand.',
        infoParaSevenBody: 'Swiss off "online day care" system can not be avoided, can not monitor the occurrence of accidents, it is not an emergency help products. For example, if an elderly person falls accidentally in the kitchen or toilet, a fall occurs, and in many cases the elderly can not afford to press for help even though they have a phone or emergency assistance device at home. And according to the research of foreign Alzheimer\'s disease (cognitive disorder) support service center, many seniors also do not have the key to ask for help. In recent years, the media often report that some elderly people living alone were accidentally discovered only after they died many days ago. Swiss off "online day care" system, no doubt can be a good solution to this problem.',
        infoParaThreeHeader: 'Third, the system features',
        infoParaFourHeader: 'Rui off "online day care" system is the biggest characteristic',
        infoParaEightBody: 'Protection of privacy, do not use audio and video surveillance',
        infoParaNineBody: 'Respect the psychological and existing habits, without wearing any equipment',
        infoParaTenBody: 'Power that work, no configuration',
        infoParaElevenBody: 'There is also no need for human intervention during use',
        infoParaTwelveBody: 'Through practice testing and feedback from users, Rui Ke "online daycare" system can help the elderly live in the home for longer and more at ease; to help reduce the anxiety and anxiety of their children, relieve psychological pressure and enhance their sense of well-being; enhance the ability of the elderly, children, The communication between communities has brought unprecedented interaction between the three parties so that the elderly and children can better appreciate the care and warmth of the party, the community and the community and embody the superiority of socialism.',
        infoParaFiveHeader: 'Fourth, Disclaimer',
        infoParaThirteenBody: 'Remind you: Before accepting and using Ritcher\'s "Internet Daycare" system, please be sure to read and thoroughly understand this statement. You may choose not to use Rui Ke, but if you use Rui Ke, your usage will be deemed to be the recognition of the entire contents of this statement.',
        infoParaFourteenBody: 'The responsibility of caring for the elderly lies in the fact that children and communities have introduced the "online daycare" system to better create a good atmosphere of "harmonious community and mutual assistance" and better care for the elderly in the community. This kind of love is not based on obligations, but out of non-reimbursable effort to help children to better care for the elderly within their ability.',
        infoParaFifteenBody: 'Due to the limitation of working hours and staff, the community can not arrange for special attention to Rui Ke "online daycare" system during working hours. The community can only arrange for staff to inspect the system on each working day, identify problems, and provide feedback to their children whenever possible. Children should be more concerned about the care of the elderly, take the initiative to identify problems.',
        infoParaSixteenBody: 'Rui off "online day care" system is a monitoring and early warning system, not emergency products, the information released is more likely, tendentious and judgmental, and can not guarantee 100% certainty of the incident.',
        infoParaSeventeenBody: 'Rui off "online day care" system and can not completely avoid the accident, but can be in the event of an accident, as far as possible the elderly by a faster and more comprehensive treatment.',
        infoParaEightteenBody: 'Finally, I hope Rui Ke will bring luck to the elderly friends and residents and friends at home, feel at ease every day',
        defaultError: 'Leider ist ein Fehler aufgetreten! Bitte versuchen Sie es erneut.',
        activateAccount: 'Konto aktivieren',
        email: 'E-Mail Adresse',
        emailError: 'Bitte geben Sie gültige E-Mail Adresse ein',
        activationCode: 'Aktivierungscode',
        activationCodeError: 'Bitte geben Sie den Aktivierungscode ein',
        activate: 'Aktivierung durchführen',
        forgotPassword: 'Passwort vergessen',
        home: 'Zuhause',
        oldPassword: 'Altes Kennwort',
        oldPasswordError: 'Bitte geben Sie das alte Kennwort ein',
        newPassword: 'Neues Kennwort',
        newPasswordError: 'Bitte geben Sie ein neues Kennwort ein',
        confirmPassword: 'Bestätigen Sie das Kennwort',
        confirmPasswordError: 'Bitte Kennwort bestätigen',
        passwordMismatchError: 'Die Kennwörter stimmen nicht überein',
        change: 'ändern',
        name: 'Name',
        nameErrorMessage: 'Bitte geben Sie einen gültigen Namen an',
        save: 'speichern',
        submit: 'übertragen',
        register: 'registrieren',
        resetPassword: 'Kennwort zurücksetzen',
        password: 'Kennwort',
        passwordError: 'Bitte Kennwort eingeben',
        signup: 'Anmelden',
        dob: 'Geburtsdatum',
        address: 'Adresse',
        male: 'Männlich',
        female: 'Weiblich',
        projectName: 'IoCare',
        hideDisconnectedText: 'Geräte ohne Verbindung ausblenden',
        firstname: 'Vorname',
        lastname: 'Nachname',
        roomNumber: 'Zimmernummer',
        gender: 'Geschlecht',
        relative: 'Angehöriger',
        remove: 'löschen',
        addRelative: 'Angehöriger hinzufügen',
        device: 'Device',
        deviceType: 'Device type',
        deviceId: 'Device Id',
        contract: 'Contract',
        contractId: 'Contract Id',
        cancel: 'Abbrechen',
        communityName: 'Gemeinschaftsname',
        noUserError: 'Keine Benutzerdaten für Sie gefunden',
        failedUserError: 'Fehler beim Laden Ihrer Benutzerdaten',
        noContractError: 'Kein Kontakt für dich gefunden',
        invalidContractError: 'Ihr Vertrag ist nicht mehr gültig',
        failedContractError: 'Failed to load your contact data',
        noDashboardError: 'Fehler beim Laden Ihrer Kontaktdaten',
        failedDashboardError: 'Fehler beim Laden der Dashboard-Daten',
        noEldersError: 'Keine Hausmeisterdaten für Sie gefunden',
        failedEldersError: 'Fehler beim Laden Ihrer Hausmeisterdaten',
        failedDeviceError: 'Fehler beim Laden der Gerätedaten',
        failedPolicy: 'Fehler beim Anhängen der AWS Iot-Richtlinie'
    });
    $translateProvider.translations('ch', {
        appName: '瑞客(RICA)网上日托',
        editProfile: '账户信息',
        changePassword: '更改密码',
        logout: '退出',
        login: '登录',
        instruction: '系统说明',
        language: '语言',
        english: '英语',
        german: '德语',
        chinese: '中文',
        landline: '座机',
        phone: '手机',
        contactName: '联系人姓名',
        relationship: '关系',
        contactNumber: '联系电话',
        noDeviceText: '无设备信息',
        noInternetText: '无网络，请检查您的互联网连接。',
        mr: '先生',
        mrs: '女士',
        infoHeader: '瑞客(RICA)网上日托系统说明',
        infoParaOneHeader: '一、背景介绍',
        infoParaOneBody: '自2000年，我国进入老龄化社会以来，人口老龄化步伐明显加快，发展态势严峻。2015年至2020年将是我国人口老龄化高速增长期。预计2020年，我国60岁以上人口将达到2.5亿，2025年将达到3亿，成为超老年型国家。养老既是个人和家庭问题，也是社会问题。因为解决广大老年人的养老服务问题是保障和改善民生的关键问题，所以习总书记对加强老龄工作作出重要指示，强调应对老龄化要立足当前、着眼长远、加强顶层设计，做到及时应对、科学应对、综合应对，要提上重要议事日程，“十三五”期间要抓好部署、落实。',
        infoParaTwoBody: '为积极应对上海市人口深度老龄化，加快推动老龄事业持续健康发展，上海市政府在正式批准发布的《上海市老龄事业发展“十三五”规划》中提出，要持续扩大养老服务供给。四个分目标之一就是“以居家为基础，社区为依托、机构为支撑、医养相结合的养老服务格局进一步完善”。',
        infoParaThreeBody: '小区党总支和居委会在街道各级领导的指导下，结合社区工作的具体实践，注意到独居老人和子女都希望“常回家看看”，但现实情况是并非每个子女都有能力、有时间、有精力做到。子女因为各自家庭和工作的繁忙，平时都不在老人身边，而老人随着年龄的增长，身体或多或少都有些健康问题，所以对独居、空巢老人的日间关怀和照顾，帮助子女减轻赡养老人的负担是一个值得关注的重点。',
        infoParaTwoHeader: '二、系统功能',
        infoParaFourBody: '随着智能化社会的到来，智能科技与社会养老服务呈现融合发展的良好局面，让“互联网+”点亮智慧养老，让“居家养老+社区辅助”的新模式成为最接地气的选择。',
        infoParaFiveBody: '本小区率先引入的国际领先、理念新颖的瑞客“网上日托”系统是世界上最极简设计、使用友好的居家养老服务。系统基于运动传感技术、大数据分析和云服务，自学习、自适应老人在家中的日常作息规律，经过3~4周的学习阶段后就可以将老人日常生活作息的“偏差或异常”以直观的色彩信息的形式传递给远方，善意地提醒不能守候在老人身边的子女或社区工作者。',
        infoParaSixBody: '千里之外，简单地一瞥，通过观察色彩信息的变化，在不干涉，不影响老人日常生活的情况下，就可以“感知”独自在家的老人的日常生活是否一切安好、如常，就像交通信号灯（绿/黄/红）一样简单易懂。',
        infoParaSevenBody: '瑞客“网上日托”系统不能避免，不能监测意外的发生，它不是一个紧急求助类产品。例如，如果老人在厨房或是卫生间出现意外，发生了跌倒的情况，即便家中有电话或是紧急求助设备，很多情况下老人是没有能力去按键求助的。而且据国外阿尔茨海默病（认知症）支持服务中心的研究指出，很多老年人也是没有意识去按键求助的。近几年媒体常有报道，一些独居老人在离世多日后才偶然被人发现的事情，令人心酸感叹。瑞客“网上日托”系统，无疑可以很好地解决这一问题。',
        infoParaThreeHeader: '三、系统特点',
        infoParaFourHeader: '瑞客“网上日托”系统最大的特点是：',
        infoParaEightBody: '保护隐私，不采用音频、视频监控；',
        infoParaNineBody: '尊重心理和既有生活习惯，无需穿戴任何设备；',
        infoParaTenBody: '上电即工作，无需配置；',
        infoParaElevenBody: '使用过程中也无需人工干预；',
        infoParaTwelveBody: '经实践检验和用户反馈，瑞客“网上日托”系统能够帮助老人居家养老，更长久更安心；帮助减轻子女心里的牵挂和不安，缓解心理压力，提升生活幸福感；能够增进老人、子女、社区之间的沟通联系，使三方之间的互动达到前所未有的层面，让老人和子女更好地感受到党、社会、社区的关怀和温暖，体现社会主义优越性。',
        infoParaFiveHeader: '四、免责声明',
        infoParaThirteenBody: '提醒您：在接受和使用瑞客“网上日托”系统前，请您务必仔细阅读并透彻理解本声明。您可以选择不使用瑞客，但如果您使用瑞客，您的使用行为将被视为对本声明全部内容的认可。',
        infoParaFourteenBody: '照顾老人的责任在于子女，社区引入瑞客“网上日托”系统是为了更好地营造“和谐社区，守望相助”的良好氛围，更好地关爱社区里的老人。这种关爱并非基于义务，而是出于无偿的、在力所能及范围之内帮助子女更好的关爱老人。',
        infoParaFifteenBody: '社区受工作时间和工作人员的限制，无法安排专人在工作时间内时刻关注瑞客“网上日托”系统。社区仅能安排工作人员在每个工作日通过系统巡查，发现问题，尽可能的向子女进行反馈。子女应更多的关心关怀老人，主动发现问题。',
        infoParaSixteenBody: '瑞客“网上日托”系统是一个监测预警系统，不是紧急求助类产品，对发布的信息，更多是可能性、倾向性和判断性，并不能保证事件发生100%的确定性。',
        infoParaSeventeenBody: '瑞客“网上日托”系统并不能完全避免意外的发生，但可以在发生意外后，尽可能的让老人受到更快、更全面的救治。',
        infoParaEightteenBody: '最后，希望“瑞客”为老年朋友们、居民朋友们带来祥瑞，幸福安康。让居家养老，安心每一天！',
        defaultError: '发生异常，请重试。',
        activateAccount: '激活账户',
        email: '电子邮件',
        emailError: '请提供有效的电子邮件',
        activationCode: '激活码',
        activationCodeError: '请提供激活码',
        activate: '激活',
        forgotPassword: '忘记密码',
        home: '首页',
        oldPassword: '旧密码',
        oldPasswordError: '请输入旧密码',
        newPassword: '新密码',
        newPasswordError: '请输入新密码',
        confirmPassword: '确认密码',
        confirmPasswordError: '请确认密码',
        passwordMismatchError: '密码不一致',
        change: '更改',
        name: '名称',
        nameErrorMessage: '请提供有限名称',
        save: '保存',
        submit: '提交',
        register: '注册',
        resetPassword: '重设密码',
        password: '密码',
        passwordError: '请输入密码',
        signup: '注册',
        dob: '生日',
        address: '地址',
        male: '男',
        female: '女',
        projectName: '瑞客(RICA)网上日托服务',
        hideDisconnectedText: '隐藏断开连接的设备',
        firstname: '名',
        lastname: '姓',
        roomNumber: '房间',
        gender: '性别',
        relative: '亲友',
        remove: '删除',
        addRelative: '添加亲友',
        device: '设备',
        deviceType: '设备类型',
        deviceId: '设备序号',
        contract: 'Contract',
        contractId: 'Contract Id',
        cancel: '取消',
        communityName: '社区名称',
        noUserError: '没有找到您的用户信息',
        failedUserError: '无法加载您的用户信息',
        noContractError: '没有找到您的合同信息',
        invalidContractError: '您的合同信息不再有效',
        failedContractError: '无法加载您的合同信息',
        noDashboardError: '没有找到您的仪表板',
        failedDashboardError: '无法加载您的仪表板',
        noEldersError: '没有找到您的长者信息',
        failedEldersError: '无法加载您的长者信息',
        failedDeviceError: '无法加载您的设备信息',
        failedPolicy: '无法加载AWS IoT策略'
    });
    if (window.localStorage.getItem('lang')) {
        $translateProvider.preferredLanguage(window.localStorage.getItem('lang'));
    } else {
        $translateProvider.preferredLanguage('en');
    }
    $translateProvider.useSanitizeValueStrategy('escape');
}];
