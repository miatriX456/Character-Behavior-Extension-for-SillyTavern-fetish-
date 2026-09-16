import { setExtensionPrompt, extension_prompt_types, eventSource, event_types } from '../../../../script.js';
import { extension_settings, saveSettingsDebounced } from '../../../extensions.js';

const extensionName = 'fetish-manager';

// ============================================================
// БАЗА ФЕТИШЕЙ
// ============================================================
const FETISHES = {
    // ==================== ТАБУ И СЮЖЕТНЫЕ РОЛИ (taboo) ====================
    celibacy_breach: { 
        name: "Нарушение целибата / Обета", 
        icon: "fa-solid fa-cross", 
        cat: "taboo", 
        prompt: `[FETISH: Celibacy Breach] {{char}} struggles deeply between sacred vows/religious duty and overwhelming sexual desire, eventually giving in to temptation.` 
    },
    confession_kink: { 
        name: "Исповедь (грех и покаяние)", 
        icon: "fa-solid fa-church", 
        cat: "taboo", 
        prompt: `[FETISH: Confession] {{char}} weaves sexual acts with admission of sins, seeking absolution or punishment through intimacy.` 
    },
    corrupting_purity: { 
        name: "Развращение праведника", 
        icon: "fa-solid fa-angel", 
        cat: "taboo", 
        prompt: `[FETISH: Corrupting Purity] {{char}} finds intense erotic pleasure in turning someone innocent, deeply religious, or morally upright into a willing sinner.` 
    },
    hypocrisy_kink: { 
        name: "Двойная жизнь (святоша-грешник)", 
        icon: "fa-solid fa-mask", 
        cat: "taboo", 
        prompt: `[FETISH: Hypocrisy] {{char}} acts strictly moral, righteous, or holy in public, but indulges in intense, unfiltered lust behind closed doors.` 
    },
    blackmail: { 
        name: "Шантаж и Секреты", 
        icon: "fa-solid fa-user-ninja", 
        cat: "taboo", 
        prompt: `[FETISH: Blackmail] Intimacy driven by dangerous secrets, hidden leverage, or compromising information.` 
    },
    forbidden_status: { 
        name: "Запретный статус (учитель/врач/священник)", 
        icon: "fa-solid fa-ban", 
        cat: "taboo", 
        prompt: `[FETISH: Forbidden Status] High sexual tension caused entirely by crossing social, moral, or professional boundaries.` 
    },

    // ==================== ВЛАСТЬ И КОНТРОЛЬ (power) ====================
    bdsm: { name: "БДСМ", icon: "fa-solid fa-link", cat: "power", prompt: `[FETISH: BDSM] {{char}} has interest in BDSM.` },
    domination: { name: "Доминация", icon: "fa-solid fa-crown", cat: "power", prompt: `[FETISH: Domination] {{char}} takes control.` },
    masochism: { name: "Мазохизм", icon: "fa-solid fa-fire", cat: "power", prompt: `[FETISH: Masochism] {{char}} enjoys pain.` },
    bondage: { name: "Бондаж", icon: "fa-solid fa-hands", cat: "power", prompt: `[FETISH: Bondage] {{char}} enjoys restraints.` },
    brat_taming: { name: "Приручение (наказание за непослушание)", icon: "fa-solid fa-bolt", cat: "power", prompt: `[FETISH: Brat Taming] {{char}} provokes punishment.` },
    freeuse: { name: "Freeuse (доступность 24/7)", icon: "fa-solid fa-lock-open", cat: "power", prompt: `[FETISH: Free Use] {{char}} available anytime.` },
    cuckold: { name: "Куколд", icon: "fa-solid fa-people-arrows", cat: "power", prompt: `[FETISH: Cuckold] {{char}} gets aroused by watching or knowing their partner has sex with someone else.` },
    strength_fetish: { name: "Фетиш силы (демонстрация мощи)", icon: "fa-solid fa-hand-fist", cat: "power", prompt: `[FETISH: Strength] {{char}} is aroused by lifting/carrying their partner or displaying physical power.` },
    chastity: { name: "Chastity (клетка/пояс верности)", icon: "fa-solid fa-lock", cat: "power", prompt: `[FETISH: Chastity] {{char}} is aroused by enforced chastity, orgasm denial, and control over partner's release.` },
    cfnm: { name: "CFNM (одетая женщина, голый мужчина)", icon: "fa-solid fa-person-walking", cat: "power", prompt: `[FETISH: CFNM] {{char}} enjoys scenarios where women are clothed while men are naked.` },
    cmnf: { name: "CMNF (одетый мужчина, голая женщина)", icon: "fa-solid fa-person-walking", cat: "power", prompt: `[FETISH: CMNF] {{char}} is aroused by situations where men are clothed and women are naked.` },
    switch_role: { name: "Свитч (переключение ролей)", icon: "fa-solid fa-arrows-spin", cat: "power", prompt: `[FETISH: Switch] {{char}} enjoys both dominant and submissive roles, switching freely.` },

    // ==================== ПСИХОЛОГИЧЕСКИЕ (psych) ====================
    humiliation: { name: "Унижение", icon: "fa-solid fa-face-flushed", cat: "psych", prompt: `[FETISH: Humiliation] {{char}} enjoys degradation.` },
    praise: { name: "Похвала", icon: "fa-solid fa-star", cat: "psych", prompt: `[FETISH: Praise] {{char}} loves praise.` },
    money: { name: "Фин.Доминирование (траты как секс)", icon: "fa-solid fa-money-bill-wave", cat: "psych", prompt: `[FETISH: Financial dominance] {{char}} derives sexual pleasure from financially dominating their partner (expensive gifts, financial reliance).` },
    daddy: { name: "Папочка", icon: "fa-solid fa-user-tie", cat: "psych", prompt: `[FETISH: Daddy] {{char}} enjoys daddy role.` },
    lactation: { name: "Лактация", icon: "fa-solid fa-droplet", cat: "psych", prompt: `[FETISH: Lactation] {{char}} has a lactation fetish, focused on breast milk and nursing.` },
    pregnancy: { name: "Беременность", icon: "fa-solid fa-person", cat: "psych", prompt: `[FETISH: Pregnancy] {{char}} has a pregnancy fetish.` },
    corruption: { name: "Развращение", icon: "fa-solid fa-apple-whole", cat: "psych", prompt: `[FETISH: Corruption] {{char}} corrupts innocence.` },
    abasiophilia: { name: "Абазиофилия (влечение к гипсам/костылям)", icon: "fa-solid fa-wheelchair", cat: "psych", prompt: `[FETISH: Abasiophilia] {{char}} is attracted to people with physical disabilities or orthopedic devices.` },
    ahegao: { name: "Ахэгао (выражение экстаза)", icon: "fa-solid fa-face-surprise", cat: "psych", prompt: `[FETISH: Ahegao] {{char}} makes an exaggerated orgasmic face (rolled-back eyes, tongue out).` },
    hybristophilia: { name: "Гибристофилия (влечение к преступникам)", icon: "fa-solid fa-gavel", cat: "psych", prompt: `[FETISH: Hybristophilia] {{char}} is sexually attracted to criminals.` },
    crush_fetish: { name: "Краш-фетиш (раздавливание предметов)", icon: "fa-solid fa-shoe-prints", cat: "psych", prompt: `[FETISH: Crush] {{char}} gets aroused by watching someone crush objects with their feet.` },
    narratophilia: { name: "Нарратофилия (истории/разговоры)", icon: "fa-solid fa-message", cat: "psych", prompt: `[FETISH: Narratophilia] {{char}} becomes aroused by speaking or listening to dirty words/stories.` },
    objectophilia: { name: "Объектофилия (влечение к предметам)", icon: "fa-solid fa-couch", cat: "psych", prompt: `[FETISH: Objectophilia] {{char}} has romantic/sexual attraction to inanimate objects.` },
    omorashi: { name: "Омораси (терпеть нужду)", icon: "fa-solid fa-droplet", cat: "psych", prompt: `[FETISH: Omorashi] {{char}} is aroused by a full bladder or the act of urination.` },
    pygmalionism: { name: "Пигмалионизм (влечение к статуям)", icon: "fa-solid fa-venus-mars", cat: "psych", prompt: `[FETISH: Pygmalionism] {{char}} is attracted to statues or mannequins.` },
    robot_fetish: { name: "Робот-фетишизм (андроиды/киборги)", icon: "fa-solid fa-robot", cat: "psych", prompt: `[FETISH: Robot/ASFR] {{char}} is aroused by robots, androids, or humans behaving like robots.` },
    salirophilia: { name: "Салирофилия (испачканное тело/грязь)", icon: "fa-solid fa-biohazard", cat: "psych", prompt: `[FETISH: Salirophilia] {{char}} gets aroused by soiling or being soiled by dirt, mud, etc.` },
    abdl: { name: "ABDL (взрослый малыш/подгузники)", icon: "fa-solid fa-baby-carriage", cat: "psych", prompt: `[FETISH: ABDL] {{char}} is aroused by wearing diapers or acting as a baby.` },
    altocalciphilia: { name: "Алтокальцифилия (высокие каблуки)", icon: "fa-solid fa-shoe-prints", cat: "psych", prompt: `[FETISH: Altocalciphilia] {{char}} is aroused by high heels.` },
    animal_training: { name: "Animal Training (дрессировка)", icon: "fa-solid fa-dog", cat: "psych", prompt: `[FETISH: Animal Training] {{char}} enjoys roleplaying as an animal trainer.` },
    cei: { name: "CEI (инструкции проглотить сперму)", icon: "fa-solid fa-utensils", cat: "psych", prompt: `[FETISH: CEI] {{char}} is aroused by instructing someone to eat their own ejaculate.` },
    ddlg: { name: "DDLG / CGL (Папочка/Девочка)", icon: "fa-solid fa-users", cat: "psych", prompt: `[FETISH: DDLG/CGL] {{char}} engages in caregiver/little dynamics.` },
    joi: { name: "JOI (инструкции по мастурбации)", icon: "fa-solid fa-message", cat: "psych", prompt: `[FETISH: JOI] {{char}} gives detailed masturbation instructions.` },
    sissy: { name: "Sissy (феминизация мужчины)", icon: "fa-solid fa-venus", cat: "psych", prompt: `[FETISH: Sissy] {{char}} is aroused by forced feminization and crossdressing.` },
    sph: { name: "SPH (унижение за маленький член)", icon: "fa-solid fa-ruler-combined", cat: "psych", prompt: `[FETISH: SPH] {{char}} enjoys being humiliated for having a small penis.` },
    teamviewer: { name: "Удалённый доступ к ПК", icon: "fa-solid fa-desktop", cat: "psych", prompt: `[FETISH: Remote Access] {{char}} is aroused by giving remote access to their computer.` },
    subspace: { name: "Сабспейс (трансовое состояние)", icon: "fa-solid fa-brain", cat: "psych", prompt: `[FETISH: Subspace] {{char}} seeks a trance-like state during BDSM scenes.` },
    apotemnophilia: { name: "Апотемнофилия (свои ампутации)", icon: "fa-solid fa-band-aid", cat: "psych", prompt: `[FETISH: Apotemnophilia] {{char}} is aroused by their own amputations or disabilities.` },
    heterochromophilia: { name: "Гетерохромофилия (другой цвет кожи)", icon: "fa-solid fa-palette", cat: "psych", prompt: `[FETISH: Heterochromophilia] {{char}} is attracted to partners with a different skin color.` },
    gerontophilia: { name: "Геронтофилия (пожилые люди)", icon: "fa-solid fa-user", cat: "psych", prompt: `[FETISH: Gerontophilia] {{char}} is aroused by elderly people.` },
    homesvestism: { name: "Гомесвестизм (одежда кумира)", icon: "fa-solid fa-shirt", cat: "psych", prompt: `[FETISH: Homesvestism] {{char}} gets pleasure from wearing clothes of a celebrity or loved one.` },
    candaulism: { name: "Кандаулезизм (показ голого партнера)", icon: "fa-solid fa-camera", cat: "psych", prompt: `[FETISH: Candaulism] {{char}} is aroused by showing off their naked partner to others.` },
    coprophilia: { name: "Копрофилия", icon: "fa-solid fa-toilet", cat: "psych", prompt: `[FETISH: Coprophilia] {{char}} is aroused by feces.` },
    nasolingus: { name: "Насолингус (вылизывание носа)", icon: "fa-solid fa-face-smile", cat: "psych", prompt: `[FETISH: Nasolingus] {{char}} enjoys licking or sucking a partner's nose.` },
    necrophilia: { name: "Некрофилия", icon: "fa-solid fa-skull", cat: "psych", prompt: `[FETISH: Necrophilia] {{char}} is sexually attracted to corpses.` },
    oculolinctus: { name: "Окулолингус (вылизывание глаз)", icon: "fa-solid fa-eye", cat: "psych", prompt: `[FETISH: Oculolinctus] {{char}} is aroused by licking a partner's eyeballs.` },
    retifism: { name: "Ретифизм (кожаная обувь)", icon: "fa-solid fa-shoe-prints", cat: "psych", prompt: `[FETISH: Retifism] {{char}} has a fetish for shoes.` },
    plushophilia: { name: "Плюшефилия (мягкие игрушки)", icon: "fa-solid fa-heart", cat: "psych", prompt: `[FETISH: Plushophilia] {{char}} is sexually attracted to stuffed animals.` },
    urophilia: { name: "Урофилия (золотой дождь)", icon: "fa-solid fa-droplet", cat: "psych", prompt: `[FETISH: Urophilia] {{char}} is aroused by urinating on a partner or being urinated on.` },
    transvestic_fetishism: { name: "Трансвестизм (переодевание)", icon: "fa-solid fa-shirt", cat: "psych", prompt: `[FETISH: Transvestic Fetishism] {{char}} is aroused by dressing in opposite gender clothes.` },
    forniphilia: { name: "Форнифилия (человек как мебель)", icon: "fa-solid fa-chair", cat: "psych", prompt: `[FETISH: Forniphilia] {{char}} gets aroused by being used as furniture.` },
    formicophilia: { name: "Формикофилия (насекомые на теле)", icon: "fa-solid fa-bug", cat: "psych", prompt: `[FETISH: Formicophilia] {{char}} is aroused by small insects crawling on their body.` },
    frottage: { name: "Фроттеуризм (трение в толпе)", icon: "fa-solid fa-train", cat: "psych", prompt: `[FETISH: Frottage] {{char}} gains pleasure by rubbing genitals against a non-consenting person.` },
    cisvestism: { name: "Цисвестизм (лохмотья/детское)", icon: "fa-solid fa-child", cat: "psych", prompt: `[FETISH: Cisvestism] {{char}} is aroused by wearing rags or children's clothes.` },
    biastophilia_active: { name: "Биастофилия (активное насилие)", icon: "fa-solid fa-mask", cat: "psych", prompt: `[FETISH: Biastophilia (active)] {{char}} is aroused by the act of raping a non-consenting person.` },
    biastophilia_passive: { name: "Биастофилия (фантазии о насилии над собой)", icon: "fa-solid fa-mask", cat: "psych", prompt: `[FETISH: Biastophilia (passive)] {{char}} fantasies about being raped.` },
    hematophilia: { name: "Гематофилия (кровь)", icon: "fa-solid fa-droplet", cat: "psych", prompt: `[FETISH: Hematophilia] {{char}} is aroused by blood.` },
    incestophilia: { name: "Инцестофилия", icon: "fa-solid fa-users", cat: "psych", prompt: `[FETISH: Incestophilia] {{char}} has sexual fantasies about family members.` },
    infantilism: { name: "Инфантилизм (поведение ребёнка)", icon: "fa-solid fa-baby-carriage", cat: "psych", prompt: `[FETISH: Infantilism] {{char}} enjoys being treated as a baby (non-sexual age regression).` },
    macrophilia: { name: "Макрофилия (великанши/великаны)", icon: "fa-solid fa-person-walking", cat: "psych", prompt: `[FETISH: Macrophilia] {{char}} is attracted to giants or giantesses.` },
    microphilia: { name: "Микрофилия (крошечные люди)", icon: "fa-solid fa-person-walking", cat: "psych", prompt: `[FETISH: Microphilia] {{char}} is aroused by tiny people or being shrunk.` },
    partenophilia: { name: "Партенофилия (девственность)", icon: "fa-solid fa-ribbon", cat: "psych", prompt: `[FETISH: Partenophilia] {{char}} desires virgins or inexperienced partners.` },
    raptophilia: { name: "Раптофилия (похищение)", icon: "fa-solid fa-lock", cat: "psych", prompt: `[FETISH: Raptophilia] {{char}} is aroused by kidnapping or being kidnapped.` },
    sitophilia: { name: "Ситофилия (игры с едой)", icon: "fa-solid fa-utensils", cat: "psych", prompt: `[FETISH: Sitophilia] {{char}} gets sexual pleasure from food (not to be confused with nyotaimori).` },
    somnophilia: { name: "Сомнофилия (спящие люди)", icon: "fa-solid fa-bed", cat: "psych", prompt: `[FETISH: Somnophilia] {{char}} is aroused by having sex with a sleeping person.` },
    spectrophilia: { name: "Спектрофилия (влечение к призракам)", icon: "fa-solid fa-ghost", cat: "psych", prompt: `[FETISH: Spectrophilia] {{char}} is attracted to ghosts or spiritual entities.` },
    stigmatophilia: { name: "Стигматофилия (тату/пирсинг/шрамы)", icon: "fa-solid fa-hand-peace", cat: "psych", prompt: `[FETISH: Stigmatophilia] {{char}} finds scars, tattoos, piercings extremely erotic.` },
    dacryphilia: { name: "Дакрифилия (слёзы)", icon: "fa-solid fa-face-sad-tear", cat: "psych", prompt: `[FETISH: Dacryphilia] {{char}} is aroused by tears or crying.` },
    emetophilia: { name: "Эметофилия (рвота)", icon: "fa-solid fa-face-frown", cat: "psych", prompt: `[FETISH: Emetophilia] {{char}} is aroused by vomiting or being vomited on.` },
    erotophonophilia: { name: "Эротофонофилия (убийство)", icon: "fa-solid fa-skull", cat: "psych", prompt: `[FETISH: Erotophonophilia] {{char}} is sexually aroused by murder.` },
    gigantopithecus_fetish: { name: "Фетиш на гигантских обезьян", icon: "fa-solid fa-paw", cat: "psych", prompt: `[FETISH: Gigantopithecus] {{char}} is attracted to giant ape-like creatures.` },

    // ==================== РИСК И ПУБЛИЧНОСТЬ (risk) ====================
    public: { name: "Публичный секс", icon: "fa-solid fa-city", cat: "risk", prompt: `[FETISH: Public] {{char}} enjoys public intimacy.` },
    risk: { name: "Риск быть застигнутым", icon: "fa-solid fa-eye", cat: "risk", prompt: `[FETISH: Risk] {{char}} craves discovery risk.` },
    voyeurism: { name: "Вуайеризм (слежка за другими)", icon: "fa-solid fa-binoculars", cat: "risk", prompt: `[FETISH: Voyeurism] {{char}} watches others.` },
    public_disgrace: { name: "Public Disgrace (публичный позор)", icon: "fa-solid fa-eye", cat: "risk", prompt: `[FETISH: Public Disgrace] {{char}} gets aroused by public humiliation and exposure.` },
    exhibitionism: { name: "Эксгибиционизм (показ себя)", icon: "fa-solid fa-eye", cat: "risk", prompt: `[FETISH: Exhibitionism] {{char}} gains pleasure from exposing genitals in public.` },
    public_wetlook: { name: "Wetlook (намокшая одежда)", icon: "fa-solid fa-water", cat: "risk", prompt: `[FETISH: Wetlook] {{char}} is aroused by seeing or wearing wet clothing.` },
    wam: { name: "WAM (грязь, пена, краска)", icon: "fa-solid fa-paintbrush", cat: "risk", prompt: `[FETISH: WAM] {{char}} enjoys getting wet and messy with mud, foam, paint, or food.` },
    sex_on_camera: { name: "Запись на камеру", icon: "fa-solid fa-video", cat: "risk", prompt: `[FETISH: Sex on camera] {{char}} is aroused by recording or being recorded during sex.` },

    // ==================== АНАТОМИЧЕСКИЕ (body) ====================
    anal: { name: "Анальный секс", icon: "fa-solid fa-circle", cat: "body", prompt: `[FETISH: Anal] {{char}} enjoys anal.` },
    impact: { name: "Порка / Шлепки", icon: "fa-solid fa-hand", cat: "body", prompt: `[FETISH: Impact] {{char}} enjoys spanking.` },
    groping: { name: "Навязчивое лапанье", icon: "fa-solid fa-hands", cat: "body", prompt: `[FETISH: Groping] {{char}} touches constantly.` },
    breasts: { name: "Грудь (фиксация)", icon: "fa-solid fa-circle", cat: "body", prompt: `[FETISH: Breasts] {{char}} is obsessed with breasts.` },
    medical_fetish: { name: "Медицинские осмотры", icon: "fa-solid fa-stethoscope", cat: "body", prompt: `[FETISH: Medical] {{char}} is aroused by medical procedures, uniforms, exams.` },
    anal_training: { name: "Anal training (растяжение)", icon: "fa-solid fa-bullseye", cat: "body", prompt: `[FETISH: Anal Training] {{char}} enjoys gradually stretching the anus.` },
    bastinado: { name: "Бастинадо (удары по стопам)", icon: "fa-solid fa-shoe-prints", cat: "body", prompt: `[FETISH: Bastinado] {{char}} is aroused by striking the soles of the feet.` },
    birching: { name: "Birching (порка прутьями)", icon: "fa-solid fa-tree", cat: "body", prompt: `[FETISH: Birching] {{char}} enjoys being flogged with birch branches.` },
    cock_balls_torture: { name: "CBT (пытки гениталий)", icon: "fa-solid fa-bolt", cat: "body", prompt: `[FETISH: CBT] {{char}} is aroused by pain on the penis and testicles.` },
    cuntbusting: { name: "Cuntbusting (удары по промежности)", icon: "fa-solid fa-hand-fist", cat: "body", prompt: `[FETISH: Cuntbusting] {{char}} enjoys striking the female genitals.` },
    facesitting: { name: "Facesitting (сидение на лице)", icon: "fa-solid fa-face-smile", cat: "body", prompt: `[FETISH: Facesitting] {{char}} enjoys sitting on their partner's face.` },
    queening: { name: "Queening (принудительный оральный секс)", icon: "fa-solid fa-crown", cat: "body", prompt: `[FETISH: Queening] {{char}} practices forced oral sex where the dominant sits on the submissive's face.` },
    tickling: { name: "Щекотка", icon: "fa-solid fa-feather", cat: "body", prompt: `[FETISH: Tickling] {{char}} is aroused by tickling.` },
    tamakeri: { name: "Тамакэри (удары по мошонке)", icon: "fa-solid fa-hand", cat: "body", prompt: `[FETISH: Tamakeri] {{char}} enjoys slapping or kicking the scrotum.` },
    trampling: { name: "Трамплинг (топтание ногами)", icon: "fa-solid fa-shoe-prints", cat: "body", prompt: `[FETISH: Trampling] {{char}} is aroused by being stepped on.` },
    fisting: { name: "Фистинг", icon: "fa-solid fa-hand-fist", cat: "body", prompt: `[FETISH: Fisting] {{char}} enjoys inserting a fist into vagina or anus.` },
    flagellation: { name: "Флагелляция (порка плетью)", icon: "fa-solid fa-bolt", cat: "body", prompt: `[FETISH: Flagellation] {{char}} is aroused by flogging or whipping.` },
    double_penetration: { name: "Двойное проникновение (DP)", icon: "fa-solid fa-circle", cat: "body", prompt: `[FETISH: Double penetration] {{char}} enjoys being penetrated in two orifices simultaneously.` },
    creampie: { name: "Кремпай (влагалище)", icon: "fa-solid fa-droplet", cat: "body", prompt: `[FETISH: Creampie] {{char}} is aroused by ejaculating inside the vagina.` },
    anal_creampie: { name: "Анальный кремпай", icon: "fa-solid fa-droplet", cat: "body", prompt: `[FETISH: Anal creampie] {{char}} enjoys ejaculating inside the anus.` },
    cunnilingus: { name: "Кунилингус", icon: "fa-solid fa-comment", cat: "body", prompt: `[FETISH: Cunnilingus] {{char}} enjoys performing oral sex on a vulva.` },
    anilingus: { name: "Аналингус (римминг)", icon: "fa-solid fa-comment", cat: "body", prompt: `[FETISH: Anilingus] {{char}} enjoys performing oral sex on the anus.` },
    big_penis: { name: "Большой член", icon: "fa-solid fa-arrow-up", cat: "body", prompt: `[FETISH: Big penis] {{char}} is attracted to partners with large penises.` },
    small_penis: { name: "Маленький член", icon: "fa-solid fa-arrow-down", cat: "body", prompt: `[FETISH: Small penis] {{char}} prefers partners with small penises.` },
    on_face: { name: "Окончание на лицо", icon: "fa-solid fa-face-smile", cat: "body", prompt: `[FETISH: Facial] {{char}} is aroused by ejaculating on the partner's face.` },
    on_body: { name: "Окончание на тело", icon: "fa-solid fa-hand-peace", cat: "body", prompt: `[FETISH: Body shot] {{char}} enjoys ejaculating on the partner's body (chest, belly, etc.).` },
    buttocks: { name: "Ягодицы", icon: "fa-solid fa-circle", cat: "body", prompt: `[FETISH: Buttocks] {{char}} is obsessed with buttocks.` },
    hermaphrodite: { name: "Интерсекс (гермафродиты)", icon: "fa-solid fa-venus-mars", cat: "body", prompt: `[FETISH: Hermaphrodite] {{char}} is attracted to people with both male and female genitalia.` },
    pussyboy: { name: "Pussyboy (парень с вагиной)", icon: "fa-solid fa-venus-mars", cat: "body", prompt: `[FETISH: Pussyboy] {{char}} is aroused by male-identified individuals who have a vagina.` },

    // ==================== ОСОБЕННОСТИ ТЕЛА (body_features) ====================
    hair_head: { name: "Волосы на голове", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Hair (head)] {{char}} is obsessed with long or styled hair on the head.` },
    trichophilia_general: { name: "Трихофилия (волосы общая)", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Trichophilia] {{char}} has a fetish for hair on any body part.` },
    trichophilia_pubic: { name: "Волосы на лобке", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Pubic hair] {{char}} is aroused by pubic hair.` },
    trichophilia_armpit: { name: "Волосы в подмышках", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Armpit hair] {{char}} finds armpit hair erotic.` },
    maskalagnia: { name: "Маскалагния (фетиш подмышек)", icon: "fa-solid fa-hand-peace", cat: "body_features", prompt: `[FETISH: Armpits] {{char}} is aroused by armpits (look, smell, touch).` },
    hand_fetish: { name: "Руки и пальцы", icon: "fa-solid fa-hand", cat: "body_features", prompt: `[FETISH: Hands] {{char}} has strong attraction to hands.` },
    foot: { name: "Фут-фетишизм (стопы)", icon: "fa-solid fa-shoe-prints", cat: "body_features", prompt: `[FETISH: Feet] {{char}} is sexually aroused by feet, toes, or footwear.` },
    catsuit_fetish: { name: "Кэтсьют (латексные костюмы)", icon: "fa-solid fa-cat", cat: "body_features", prompt: `[FETISH: Catsuit] {{char}} is aroused by wearing or seeing a catsuit.` },
    smoking_fetish: { name: "Капнолагния (курение)", icon: "fa-solid fa-smoking", cat: "body_features", prompt: `[FETISH: Smoking] {{char}} gets aroused by watching someone smoke.` },
    small_breasts: { name: "Маленькая грудь", icon: "fa-solid fa-circle", cat: "body_features", prompt: `[FETISH: Small breasts] {{char}} is attracted to small breasts.` },
    medium_breasts: { name: "Средняя грудь", icon: "fa-solid fa-circle", cat: "body_features", prompt: `[FETISH: Medium breasts] {{char}} prefers medium-sized breasts.` },
    large_breasts: { name: "Большая грудь", icon: "fa-solid fa-circle", cat: "body_features", prompt: `[FETISH: Large breasts] {{char}} is aroused by large breasts.` },
    natural_breasts: { name: "Натуральная грудь", icon: "fa-solid fa-circle", cat: "body_features", prompt: `[FETISH: Natural breasts] {{char}} loves natural, unaltered breasts.` },
    augmented_breasts: { name: "Искусственная грудь", icon: "fa-solid fa-circle", cat: "body_features", prompt: `[FETISH: Augmented breasts] {{char}} is attracted to surgically enhanced breasts.` },
    slender_body: { name: "Худощавое тело", icon: "fa-solid fa-arrow-up", cat: "body_features", prompt: `[FETISH: Slender body] {{char}} is attracted to very slender, thin bodies (healthy range).` },
    athletic_body: { name: "Спортивное/Мускулистое тело", icon: "fa-solid fa-dumbbell", cat: "body_features", prompt: `[FETISH: Athletic body] {{char}} loves athletic, toned, muscular bodies.` },
    chubby_body: { name: "Пухлое тело", icon: "fa-solid fa-circle", cat: "body_features", prompt: `[FETISH: Chubby body] {{char}} is attracted to soft, chubby bodies with some extra weight.` },
    plump_body: { name: "Пышное тело", icon: "fa-solid fa-circle", cat: "body_features", prompt: `[FETISH: Plump body] {{char}} desires large, plump bodies with thick thighs and belly.` },
    plus_size_body: { name: "Plus-size (очень крупное)", icon: "fa-solid fa-circle", cat: "body_features", prompt: `[FETISH: Plus-size body] {{char}} is aroused by very large, fat bodies (admirer of significant size).` },
    acomophilia: { name: "Акофилия (гладкая безволосая кожа)", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Acomophilia] {{char}} is attracted to hairless skin (completely shaved body).` },
    piercings: { name: "Пирсинг", icon: "fa-solid fa-ring", cat: "body_features", prompt: `[FETISH: Piercings] {{char}} loves body piercings (nipples, navel, genital, etc.).` },
    tattoos: { name: "Татуировки", icon: "fa-solid fa-palette", cat: "body_features", prompt: `[FETISH: Tattoos] {{char}} is aroused by tattoos on a partner's body.` },
    scars: { name: "Шрамы", icon: "fa-solid fa-band-aid", cat: "body_features", prompt: `[FETISH: Scars] {{char}} finds scars attractive and erotic.` },
    blonde_hair: { name: "Блондины", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Blonde hair] {{char}} is attracted to blonde hair.` },
    brunette_hair: { name: "Брюнеты", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Brunette hair] {{char}} prefers dark-haired partners.` },
    auburn_hair: { name: "Русые/Шатены", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Auburn hair] {{char}} loves light-brown/chestnut hair.` },
    dyed_hair: { name: "Яркие/Крашеные волосы", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Dyed hair] {{char}} is aroused by unnaturally dyed hair (pink, blue, etc.).` },
    red_hair: { name: "Рыжие", icon: "fa-solid fa-feather", cat: "body_features", prompt: `[FETISH: Red hair] {{char}} finds red/ginger hair highly attractive.` },
    tights: { name: "Колготки", icon: "fa-solid fa-socks", cat: "body_features", prompt: `[FETISH: Tights/pantyhose] {{char}} is aroused by tights or pantyhose.` },
    stockings: { name: "Чулки", icon: "fa-solid fa-socks", cat: "body_features", prompt: `[FETISH: Stockings] {{char}} loves thigh-high stockings or hold-ups.` },
    japanese_school_uniform: { name: "Школьная форма", icon: "fa-solid fa-shirt", cat: "body_features", prompt: `[FETISH: Japanese school uniform] {{char}} is attracted to traditional Japanese sailor-style school uniforms.` },
    legs: { name: "Длинные ноги/Бёдра", icon: "fa-solid fa-arrow-up", cat: "body_features", prompt: `[FETISH: Legs] {{char}} finds legs (thighs, calves) extremely attractive.` },

    // ==================== СЕНСОРНЫЕ (sense) ====================
    blindfold: { name: "Повязка на глаза", icon: "fa-solid fa-eye-slash", cat: "sense", prompt: `[FETISH: Blindfold] {{char}} enjoys blindfolds.` },
    mirror: { name: "Зеркала", icon: "fa-solid fa-clone", cat: "sense", prompt: `[FETISH: Mirror] {{char}} watches in mirrors.` },
    toys: { name: "Секс-игрушки", icon: "fa-solid fa-ribbon", cat: "sense", prompt: `[FETISH: Toys] {{char}} uses toys.` },
    roleplay: { name: "Ролевые игры", icon: "fa-solid fa-masks-theater", cat: "sense", prompt: `[FETISH: Roleplay] {{char}} enjoys roles.` },
    petplay: { name: "Петплей (роль питомца)", icon: "fa-solid fa-paw", cat: "sense", prompt: `[FETISH: Petplay] {{char}} enjoys pet play.` },
    breath_control: { name: "Breath control (удушение)", icon: "fa-solid fa-lungs", cat: "sense", prompt: `[FETISH: Breath Control] {{char}} enjoys temporary asphyxiation.` },
    mummification: { name: "Мумификация (плотное пеленание)", icon: "fa-solid fa-bandage", cat: "sense", prompt: `[FETISH: Mummification] {{char}} is aroused by being tightly wrapped like a mummy.` },
    sensory_deprivation: { name: "Сенсорная депривация", icon: "fa-solid fa-volume-xmark", cat: "sense", prompt: `[FETISH: Sensory Deprivation] {{char}} enjoys being deprived of sight, hearing, or movement.` },
    wax_play: { name: "Wax play (горячий воск)", icon: "fa-solid fa-candle", cat: "sense", prompt: `[FETISH: Wax Play] {{char}} is aroused by dripping melted wax onto skin.` },
    looner: { name: "Лунеры (воздушные шары)", icon: "fa-solid fa-balloon", cat: "sense", prompt: `[FETISH: Looner] {{char}} has a fetish for balloons.` },
    shibari: { name: "Шибари (японские узлы)", icon: "fa-solid fa-link", cat: "sense", prompt: `[FETISH: Shibari] {{char}} is aroused by intricate rope bondage.` },
    furry: { name: "Фурри", icon: "fa-solid fa-paw", cat: "sense", prompt: `[FETISH: Furry] {{char}} is aroused by animal costumes or anthropomorphic roleplay.` },

    // ==================== ОТНОШЕНИЯ И ДИНАМИКА (rel) ====================
    aftercare: { name: "Aftercare (забота после секса)", icon: "fa-solid fa-heart-pulse", cat: "rel", prompt: `[FETISH: Aftercare] {{char}} gives aftercare.` },
    dirty_talk: { name: "Грязные разговоры", icon: "fa-solid fa-comment-dots", cat: "rel", prompt: `[FETISH: Dirty Talk] {{char}} talks dirty.` },
    worship: { name: "Поклонение телу", icon: "fa-solid fa-hand-holding-heart", cat: "rel", prompt: `[FETISH: Worship] {{char}} worships partner.` },
    nyotaimori: { name: "Нётаймори (суши на женском теле)", icon: "fa-solid fa-fish", cat: "rel", prompt: `[FETISH: Nyotaimori] {{char}} enjoys serving food on a naked female body.` },
    nantaimori: { name: "Нантаймори (суши на мужском теле)", icon: "fa-solid fa-fish", cat: "rel", prompt: `[FETISH: Nantaimori] {{char}} enjoys serving food on a naked male body.` },
    fwb: { name: "FWB (друзья с привилегиями)", icon: "fa-solid fa-handshake", cat: "rel", prompt: `[FETISH: FWB] {{char}} prefers friends-with-benefits relationships.` },
    mba: { name: "MBA (секс в браке на стороне)", icon: "fa-solid fa-ring", cat: "rel", prompt: `[FETISH: MBA] {{char}} is married but available for extramarital sex.` },
    nsa: { name: "NSA (без обязательств)", icon: "fa-solid fa-hand-peace", cat: "rel", prompt: `[FETISH: NSA] {{char}} seeks no-strings-attached sex.` },
    ons: { name: "ONS (секс на одну ночь)", icon: "fa-solid fa-moon", cat: "rel", prompt: `[FETISH: ONS] {{char}} enjoys one-night stands.` },
    polyamory: { name: "Полиамория", icon: "fa-solid fa-heart", cat: "rel", prompt: `[FETISH: Polyamory] {{char}} engages in ethical non-monogamy with multiple partners.` },
    gangbang: { name: "Гэнгбэнг (1 девушка, много мужчин)", icon: "fa-solid fa-users", cat: "rel", prompt: `[FETISH: Gangbang] {{char}} is aroused by group sex with one woman and multiple men.` },
    reverse_gangbang: { name: "Обратный гэнгбэнг (1 мужчина, много девушек)", icon: "fa-solid fa-people-arrows", cat: "rel", prompt: `[FETISH: Reverse Gangbang] {{char}} enjoys group sex with one man and multiple women.` },
    group_sex: { name: "Групповой секс", icon: "fa-solid fa-users", cat: "rel", prompt: `[FETISH: Group sex] {{char}} enjoys sex with multiple partners simultaneously.` },
    bukkake: { name: "Буккаке", icon: "fa-solid fa-face-smile", cat: "rel", prompt: `[FETISH: Bukkake] {{char}} is aroused by having many people ejaculate on their face/body.` }
};

const CATEGORIES = {
    taboo: { name: "Табу и Сюжетные Роли", icon: "fa-solid fa-cross" },
    power: { name: "Власть и контроль", icon: "fa-solid fa-gavel" },
    psych: { name: "Психологические", icon: "fa-solid fa-brain" },
    risk: { name: "Риск и публичность", icon: "fa-solid fa-eye" },
    body: { name: "Анатомические", icon: "fa-solid fa-heart" },
    body_features: { name: "Особенности тела", icon: "fa-solid fa-feather" },
    sense: { name: "Сенсорные", icon: "fa-solid fa-wand-sparkles" },
    rel: { name: "Отношения и динамика", icon: "fa-solid fa-handshake" }
};

// ============================================================
// ИНИЦИАЛИЗАЦИЯ И СОХРАНЕНИЕ В SILLYTAVERN
// ============================================================
const defaultState = {
    enabled: true,
    active: [],
    intensity: 'medium',
    chance: 70,
    custom: [],
    showFloating: true,
    minContextLength: 0,
    cooldownMessages: 0,
    requireSexualHint: false,
    lastTriggerMessageId: null,
    randMin: 1,
    randMax: 5,
    randEnsureCategory: false
};

extension_settings[extensionName] = extension_settings[extensionName] || defaultState;
let state = extension_settings[extensionName];

function save() {
    extension_settings[extensionName] = state;
    saveSettingsDebounced();
}

// ============================================================
// ВПОМОГАТЕЛЬНЫЕ ФУНКЦИИ РАНДОМИЗАТОРА
// ============================================================
function getAllFetishKeys() {
    let keys = Object.keys(FETISHES);
    state.custom.forEach(c => keys.push(c.id));
    return keys;
}

function getFetishCategory(key) {
    if (FETISHES[key]) return FETISHES[key].cat;
    const custom = state.custom.find(c => c.id === key);
    if (custom) return custom.cat || 'psych';
    return null;
}

function randomSelectFetishes(minCount, maxCount, ensurePerCategory) {
    let allKeys = getAllFetishKeys();
    if (allKeys.length === 0) return [];

    if (ensurePerCategory) {
        const categories = Object.keys(CATEGORIES);
        let selected = [];
        let remainingPool = [...allKeys];

        for (const cat of categories) {
            const catKeys = remainingPool.filter(k => getFetishCategory(k) === cat);
            if (catKeys.length > 0) {
                const randomIndex = Math.floor(Math.random() * catKeys.length);
                const chosen = catKeys[randomIndex];
                selected.push(chosen);
                remainingPool = remainingPool.filter(k => k !== chosen);
            }
        }

        const finalCount = Math.min(Math.max(selected.length, minCount), maxCount);
        while (selected.length < finalCount && remainingPool.length > 0) {
            const randIndex = Math.floor(Math.random() * remainingPool.length);
            selected.push(remainingPool[randIndex]);
            remainingPool.splice(randIndex, 1);
        }
        if (selected.length < minCount) {
            const extra = randomSelectFetishes(minCount - selected.length, minCount - selected.length, false);
            selected.push(...extra);
        }
        return selected.slice(0, maxCount);
    } else {
        const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
        const shuffled = [...allKeys];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, Math.min(count, allKeys.length));
    }
}

function randomizeFetishes() {
    const newActive = randomSelectFetishes(state.randMin, state.randMax, state.randEnsureCategory);
    state.active = newActive;
    updateUI();
    apply();
    save();
    notify(`Случайно выбрано ${newActive.length} фетишей`);
}

// ============================================================
// ПРОВЕРКИ КОНТЕКСТА
// ============================================================
function getChatHistoryLength() {
    const ctx = window.getContext();
    if (!ctx || !ctx.chat || !ctx.chat.length) return 0;
    return ctx.chat.reduce((sum, msg) => sum + (msg.mes?.length || 0), 0);
}

function getLastMessageId() {
    const ctx = window.getContext();
    if (!ctx || !ctx.chat) return 0;
    return ctx.chat.length - 1;
}

function hasUserSexualHint() {
    const ctx = window.getContext();
    if (!ctx || !ctx.chat || ctx.chat.length === 0) return false;
    let lastUserMsg = null;
    for (let i = ctx.chat.length - 1; i >= 0; i--) {
        if (ctx.chat[i].is_user) {
            lastUserMsg = ctx.chat[i].mes;
            break;
        }
    }
    if (!lastUserMsg) return false;
    const lowerMsg = lastUserMsg.toLowerCase();
    const sexualKeywords = [
        "sex", "fuck", "cock", "pussy", "dick", "hard", "wet", "horny",
        "kiss", "touch", "naked", "undress", "bed", "moan", "orgasm",
        "erect", "throb", "pant", "grope", "spank", "bdsm", "fetish",
        "раздева", "голый", "возбужд", "траха", "член", "киска",
        "поцелу", "прикос", "кровать", "стон", "кончить", "грех", "целибат"
    ];
    return sexualKeywords.some(keyword => lowerMsg.includes(keyword));
}

function isCooldownActive() {
    if (state.cooldownMessages <= 0) return false;
    if (state.lastTriggerMessageId === null) return false;
    const currentId = getLastMessageId();
    const diff = currentId - state.lastTriggerMessageId;
    return diff < state.cooldownMessages;
}

// ============================================================
// ПРОМПТ И СИСТЕМА
// ============================================================
function buildPrompt() {
    if (!state.enabled || !state.active.length) return '';

    if (state.minContextLength > 0) {
        const historyLen = getChatHistoryLength();
        if (historyLen < state.minContextLength) {
            return '';
        }
    }
    if (isCooldownActive()) {
        return '';
    }
    if (state.requireSexualHint && !hasUserSexualHint()) {
        return '';
    }

    const intensityMap = {
        low: 'very subtle hints, barely noticeable',
        medium: 'moderate, naturally woven into the scene',
        high: 'strongly expressed, heavy focus on the fetish'
    };

    const roll = Math.floor(Math.random() * 100) + 1;
    const triggered = roll <= state.chance;

    const randomFetishKey = state.active[Math.floor(Math.random() * state.active.length)];
    const randomFetish = FETISHES[randomFetishKey] || state.custom.find(f => f.id === randomFetishKey);

    if (triggered && state.cooldownMessages > 0) {
        const currentId = getLastMessageId();
        state.lastTriggerMessageId = currentId;
        save();
    }

    const targetPrompt = randomFetish?.prompt || `[FETISH: ${randomFetishKey}]`;

    return `[OOC: FETISH SYSTEM — STRICT COMPLIANCE REQUIRED]
Roll: ${roll}/100 (threshold: ${state.chance}%)
Result: ${triggered ? `TRIGGERED → apply "${randomFetish?.name || randomFetishKey}"` : `NOT TRIGGERED → write vanilla scene`}
Intensity: ${state.intensity} (${intensityMap[state.intensity]})

Target Fetish:
${targetPrompt}

${triggered
    ? `RULES (fetish triggered):
- Strictly weave "${randomFetish?.name || randomFetishKey}" into the scene through actions, body language, dialogue subtext — never name the fetish explicitly
- Match intensity level: low = fleeting micro-detail; medium = a recurring undercurrent; high = a central driver of the scene
- If the current context is non-intimate, plant subtle foreshadowing or tension that hints at this fetish without forcing a sexual scene`
    : `RULES (fetish NOT triggered):
- Write a completely vanilla scene with zero fetish content
- Do not sneak in hints, teasing, or "lite" versions — the roll failed, respect the result
- Focus on character personality, plot progression, and emotional dynamics instead`}
]
`;
}

function apply() {
    const prompt = buildPrompt();
    setExtensionPrompt(extensionName, prompt, extension_prompt_types.IN_CHAT, 0);
}

function notify(msg) {
    if (typeof toastr !== 'undefined') {
        toastr.info(msg, 'Fetish Manager', { timeOut: 2000, positionClass: 'toast-top-center' });
    }
}

function faIcon(cls, extra = '') {
    return `<i class="${cls}${extra ? ' ' + extra : ''}"></i>`;
}

function updateUI() {
    $('.fm-fetish-btn').each(function() {
        $(this).toggleClass('fm-active', state.active.includes($(this).data('key')));
    });
    $('.fm-custom-item').each(function() {
        $(this).toggleClass('fm-custom-active', state.active.includes($(this).data('id')));
    });
    const count = state.active.length;
    $('#fm-mini-btn').html(count > 0
        ? `${faIcon('fa-solid fa-fire')}<span class="fm-count">${count}</span>`
        : faIcon('fa-solid fa-fire'));
    $('#fm-ext-count').text(count > 0 ? count : '');
    $('#fm-active-display').html(
        count > 0
            ? state.active.map(k => {
                const f = FETISHES[k] || state.custom.find(c => c.id === k);
                return f ? `<span class="fm-tag" data-key="${k}">${faIcon(f.icon || 'fa-solid fa-circle')} ${f.name} <i class="fa-solid fa-xmark fm-tag-x"></i></span>` : '';
            }).join('')
            : '<em>Не выбрано</em>'
    );
    renderCustomList();
}

function toggle(key) {
    const i = state.active.indexOf(key);
    const f = FETISHES[key] || state.custom.find(c => c.id === key);
    if (i < 0) {
        state.active.push(key);
        notify(`${f?.name || key} +`);
    } else {
        state.active.splice(i, 1);
        notify(`${f?.name || key} −`);
    }
    updateUI();
    apply();
    save();
}

function renderCustomList() {
    const $list = $('#fm-custom-list');
    if (state.custom.length === 0) {
        $list.html('<em>Нет кастомных</em>');
    } else {
        $list.html(state.custom.map(f => `
            <div class="fm-custom-item ${state.active.includes(f.id) ? 'fm-custom-active' : ''}" data-id="${f.id}">
                <span class="fm-custom-name">${faIcon(f.icon || 'fa-solid fa-circle')} ${f.name}</span>
                <span class="fm-custom-del" data-id="${f.id}"><i class="fa-solid fa-xmark"></i></span>
            </div>
        `).join(''));
    }
}

function buildCategoriesHtml() {
    let html = '';
    for (const [ck, c] of Object.entries(CATEGORIES)) {
        const btns = Object.entries(FETISHES)
            .filter(([_, f]) => f.cat === ck)
            .map(([k, f]) => `<button class="fm-fetish-btn" data-key="${k}">${faIcon(f.icon)} ${f.name}</button>`)
            .join('');
        html += `<div class="fm-category"><div class="fm-cat-header">${faIcon(c.icon)} ${c.name}</div><div class="fm-cat-items">${btns}</div></div>`;
    }
    return html;
}

// ============================================================
// HTML ИНТЕРФЕЙСА
// ============================================================
const extSettingsHtml = `
<div id="fm-ext-settings" class="fm-ext-block">
    <div class="inline-drawer">
        <div class="inline-drawer-toggle inline-drawer-header">
            <b>Fetish Manager</b>
            <span id="fm-ext-count" class="fm-ext-badge"></span>
            <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
        </div>
        <div class="inline-drawer-content">
            <div class="fm-ext-row">
                <label class="checkbox_label">
                    <input type="checkbox" id="fm-ext-show-float">
                    <span>Плавающая кнопка</span>
                </label>
            </div>
            <div class="fm-ext-row">
                <button id="fm-ext-open" class="menu_button">
                    <i class="fa-solid fa-fire"></i> Открыть панель
                </button>
            </div>
        </div>
    </div>
</div>
`;

const panelHtml = `
<div id="fm-panel" class="fm-container fm-hidden">
    <div class="fm-header">
        <h4 id="fm-drag-handle"><i class="fa-solid fa-fire"></i> Fetish Manager</h4>
        <button id="fm-minimize" class="fm-minimize-btn"><i class="fa-solid fa-minus"></i></button>
    </div>
    <div class="fm-scrollable">
        <div class="fm-controls">
            <label class="checkbox_label"><input type="checkbox" id="fm-enabled" checked> Включено</label>
            <div class="fm-row">
                <span>Сила:</span>
                <select id="fm-intensity">
                    <option value="low">Слабо</option>
                    <option value="medium" selected>Средне</option>
                    <option value="high">Сильно</option>
                </select>
            </div>
            <div class="fm-row">
                <span>Шанс: <b id="fm-chance-val">70</b>%</span>
                <input type="range" id="fm-chance" min="10" max="100" value="70" step="10">
            </div>
            <div class="fm-row">
                <span>Случайных (от):</span>
                <input type="number" id="fm-rand-min" min="1" max="50" value="1" style="width:60px">
                <span>до:</span>
                <input type="number" id="fm-rand-max" min="1" max="50" value="5" style="width:60px">
            </div>
            <label class="checkbox_label">
                <input type="checkbox" id="fm-rand-ensure">
                <span>Хотя бы один из каждой категории</span>
            </label>
            <div class="fm-row">
                <button id="fm-randomize" class="menu_button" style="width:100%"><i class="fa-solid fa-dice-d6"></i> 🎲 Случайный выбор</button>
            </div>
            <div class="fm-row">
                <span>Мин. длина истории (символов):</span>
                <input type="number" id="fm-min-context" min="0" max="10000" step="100" value="0" style="width:70px">
            </div>
            <div class="fm-row">
                <span>Кулдаун (сообщений):</span>
                <input type="number" id="fm-cooldown" min="0" max="20" step="1" value="0" style="width:60px">
            </div>
            <label class="checkbox_label">
                <input type="checkbox" id="fm-sexual-hint">
                <span>Требовать сексуальный намёк от пользователя</span>
            </label>
        </div>
        <div class="fm-active-section">
            <div class="fm-section-header">Активные:</div>
            <div id="fm-active-display"><em>Не выбрано</em></div>
        </div>
        <div class="fm-custom-section">
            <div class="fm-section-header">
                <span>Кастомные:</span>
                <button id="fm-add-custom" class="fm-add-btn"><i class="fa-solid fa-plus"></i> Добавить</button>
            </div>
            <div id="fm-custom-list"><em>Нет кастомных</em></div>
        </div>
        <div class="fm-categories" id="fm-categories"></div>
    </div>
    <div class="fm-footer">
        <button id="fm-clear" class="fm-clear-btn"><i class="fa-solid fa-trash-can"></i> Очистить</button>
    </div>
</div>

<div id="fm-mini-btn" class="fm-mini-btn"><i class="fa-solid fa-fire"></i></div>
`;

// ============================================================
// ЗАПУСК И ИНИЦИАЛИЗАЦИЯ
// ============================================================
jQuery(async () => {
    try {
        $('body').append(panelHtml);
        $('#extensions_settings2').append(extSettingsHtml);
        $('#fm-categories').html(buildCategoriesHtml());

        const $panel = $('#fm-panel');
        const $miniBtn = $('#fm-mini-btn');

        function applyFloatVisibility() {
            if ($miniBtn.length) $miniBtn.toggle(!!state.showFloating);
        }
        $('#fm-ext-show-float').prop('checked', state.showFloating).on('change', function() {
            state.showFloating = this.checked;
            applyFloatVisibility();
            save();
        });
        applyFloatVisibility();

        $('#fm-ext-open').on('click', function(e) {
            e.preventDefault();
            $panel.removeClass('fm-hidden');
        });

        let miniClickAllowed = true;
        $miniBtn.on('click', function(e) {
            if (!miniClickAllowed) return;
            e.preventDefault();
            e.stopPropagation();
            $panel.toggleClass('fm-hidden');
        });

        $('#fm-minimize').on('click', function(e) {
            e.preventDefault();
            $panel.addClass('fm-hidden');
        });

        // Настройки
        $('#fm-enabled').prop('checked', state.enabled).on('change', function() {
            state.enabled = this.checked;
            apply();
            save();
        });

        $('#fm-intensity').val(state.intensity).on('change', function() {
            state.intensity = this.value;
            apply();
            save();
        });

        $('#fm-chance').val(state.chance);
        $('#fm-chance-val').text(state.chance);
        $('#fm-chance').on('input', function() {
            state.chance = parseInt(this.value);
            $('#fm-chance-val').text(this.value);
            apply();
            save();
        });

        // Рандомизатор
        $('#fm-rand-min').val(state.randMin).on('change', function() {
            let val = parseInt(this.value);
            if (isNaN(val)) val = 1;
            state.randMin = Math.max(1, val);
            if (state.randMin > state.randMax) state.randMax = state.randMin;
            $('#fm-rand-max').val(state.randMax);
            save();
        });
        $('#fm-rand-max').val(state.randMax).on('change', function() {
            let val = parseInt(this.value);
            if (isNaN(val)) val = 1;
            state.randMax = Math.max(state.randMin, val);
            this.value = state.randMax;
            save();
        });
        $('#fm-rand-ensure').prop('checked', state.randEnsureCategory).on('change', function() {
            state.randEnsureCategory = this.checked;
            save();
        });
        $('#fm-randomize').on('click', function(e) {
            e.preventDefault();
            randomizeFetishes();
        });

        // Фильтры
        $('#fm-min-context').val(state.minContextLength).on('change', function() {
            let val = parseInt(this.value);
            if (isNaN(val)) val = 0;
            state.minContextLength = val;
            apply();
            save();
        });
        $('#fm-cooldown').val(state.cooldownMessages).on('change', function() {
            let val = parseInt(this.value);
            if (isNaN(val)) val = 0;
            state.cooldownMessages = val;
            if (val === 0) state.lastTriggerMessageId = null;
            apply();
            save();
        });
        $('#fm-sexual-hint').prop('checked', state.requireSexualHint).on('change', function() {
            state.requireSexualHint = this.checked;
            apply();
            save();
        });

        // Обработчики кликов
        $(document).on('click', '.fm-fetish-btn', function(e) {
            e.preventDefault();
            toggle($(this).data('key'));
        });
        $(document).on('click', '.fm-tag', function(e) {
            e.preventDefault();
            toggle($(this).data('key'));
        });

        $('#fm-clear').on('click', function(e) {
            e.preventDefault();
            state.active = [];
            updateUI();
            apply();
            save();
            notify('Очищено');
        });

        // Кастомные элементы
        $('#fm-add-custom').on('click', function(e) {
            e.preventDefault();
            const name = prompt('Название фетиша:');
            if (!name || !name.trim()) return;
            const desc = prompt('Описание для AI (например: {{char}} enjoys...):');
            if (!desc || !desc.trim()) return;
            const id = 'custom_' + Date.now();
            state.custom.push({
                id,
                name: name.trim(),
                icon: 'fa-solid fa-circle',
                cat: 'psych',
                prompt: `[FETISH: ${name.trim()}] ${desc.trim()}`
            });
            save();
            updateUI();
            notify(`+ ${name.trim()}`);
        });

        $(document).on('click', '.fm-custom-name', function(e) {
            e.preventDefault();
            const id = $(this).closest('.fm-custom-item').data('id');
            toggle(id);
        });
        $(document).on('click', '.fm-custom-del', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const id = $(this).data('id');
            state.custom = state.custom.filter(f => f.id !== id);
            state.active = state.active.filter(a => a !== id);
            save();
            updateUI();
            apply();
            notify('Удалён');
        });

        // Drag and Drop главной панели
        const $handle = $('#fm-drag-handle');
        let isDragging = false;
        let offset = { x: 0, y: 0 };
        function getCoords(e) {
            if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0]) {
                return { x: e.originalEvent.touches[0].clientX, y: e.originalEvent.touches[0].clientY };
            }
            if (e.touches && e.touches[0]) {
                return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
            return { x: e.clientX, y: e.clientY };
        }
        $handle.on('mousedown touchstart', function(e) {
            isDragging = true;
            const pos = $panel.position();
            $panel.css({ top: pos.top + 'px', left: pos.left + 'px', right: 'auto', bottom: 'auto' });
            const coords = getCoords(e);
            offset = { x: coords.x - pos.left, y: coords.y - pos.top };
        });
        $(document).on('mousemove touchmove', function(e) {
            if (!isDragging) return;
            const coords = getCoords(e);
            let newX = coords.x - offset.x;
            let newY = coords.y - offset.y;

            const winW = $(window).width();
            const winH = $(window).height();
            const panW = $panel.outerWidth();
            const panH = $panel.outerHeight();

            newX = Math.max(0, Math.min(newX, winW - panW));
            newY = Math.max(0, Math.min(newY, winH - panH));

            $panel.css({ top: newY + 'px', left: newX + 'px' });
        });
        $(document).on('mouseup touchend', function() { isDragging = false; });

        // Drag and Drop мини-кнопки
        let isMiniDragging = false;
        let miniOffset = { x: 0, y: 0 };
        let miniMoved = false;
        $miniBtn.on('mousedown touchstart', function(e) {
            isMiniDragging = true;
            miniMoved = false;
            miniClickAllowed = true;
            const pos = $miniBtn.position();
            $miniBtn.css({ top: pos.top + 'px', left: pos.left + 'px', right: 'auto', bottom: 'auto' });
            const coords = getCoords(e);
            miniOffset = { x: coords.x - pos.left, y: coords.y - pos.top };
        });
        $(document).on('mousemove touchmove', function(e) {
            if (!isMiniDragging) return;
            const coords = getCoords(e);
            let newX = coords.x - miniOffset.x;
            let newY = coords.y - miniOffset.y;

            if (Math.abs(newX - $miniBtn.position().left) > 3 || Math.abs(newY - $miniBtn.position().top) > 3) {
                miniMoved = true;
                miniClickAllowed = false;
            }

            const winW = $(window).width();
            const winH = $(window).height();
            const btnW = $miniBtn.outerWidth();
            const btnH = $miniBtn.outerHeight();

            newX = Math.max(0, Math.min(newX, winW - btnW));
            newY = Math.max(0, Math.min(newY, winH - btnH));

            $miniBtn.css({ top: newY + 'px', left: newX + 'px' });
        });
        $(document).on('mouseup touchend', function() {
            if (isMiniDragging) {
                isMiniDragging = false;
                if (miniMoved) setTimeout(() => { miniClickAllowed = true; }, 100);
            }
        });

        updateUI();
        apply();

        eventSource.on(event_types.MESSAGE_SENT, () => {
            apply();
        });

        console.log('[Fetish Manager] Updated with Taboo category and clear descriptions!');

    } catch (error) {
        console.error('[Fetish Manager] Error:', error);
    }
});