import { setExtensionPrompt, extension_prompt_types, eventSource, event_types } from '../../../../script.js';

const extensionName = 'fetish-manager';

const FETISHES = {
    // ========== ОРИГИНАЛЬНЫЕ ФЕТИШИ ==========
    bdsm: { name: "БДСМ", icon: "fa-solid fa-link", cat: "power", prompt: `[FETISH: BDSM] {{char}} has interest in BDSM.` },
    domination: { name: "Доминация", icon: "fa-solid fa-crown", cat: "power", prompt: `[FETISH: Domination] {{char}} takes control.` },
    masochism: { name: "Мазохизм", icon: "fa-solid fa-fire", cat: "power", prompt: `[FETISH: Masochism] {{char}} enjoys pain.` },
    bondage: { name: "Бондаж", icon: "fa-solid fa-hands-bound", cat: "power", prompt: `[FETISH: Bondage] {{char}} enjoys restraints.` },
    brat_taming: { name: "Приручение", icon: "fa-solid fa-bolt", cat: "power", prompt: `[FETISH: Brat Taming] {{char}} provokes punishment.` },
    freeuse: { name: "Freeuse", icon: "fa-solid fa-lock-open", cat: "power", prompt: `[FETISH: Free Use] {{char}} available anytime.` },
    humiliation: { name: "Унижение", icon: "fa-solid fa-face-flushed", cat: "psych", prompt: `[FETISH: Humiliation] {{char}} enjoys degradation.` },
    praise: { name: "Похвала", icon: "fa-solid fa-star", cat: "psych", prompt: `[FETISH: Praise] {{char}} loves praise.` },
    money: { name: "Фин.Доминирование", icon: "fa-solid fa-money-bill-wave", cat: "psych", prompt: `[FETISH: Financial dominance] {{char}} derives profound sexual and psychological pleasure from financially dominating their partner, which includes the mandatory purchase of expensive gifts, jewelry, or property. They must insist on the partner accepting large sums of money or having full financial reliance on them. The act of "gifting" is a core element of sexual arousal and control` },
    daddy: { name: "Папочка", icon: "fa-solid fa-user-tie", cat: "psych", prompt: `[FETISH: Daddy] {{char}} enjoys daddy role.` },
    lactation: { name: "Лактация", icon: "fa-solid fa-droplet", cat: "psych", prompt: `[FETISH: Lactation] {{char}} has a lactation fetish and focuses on breast milk and nursing.` },
    pregnancy: { name: "Беременность", icon: "fa-solid fa-person-pregnant", cat: "psych", prompt: `[FETISH: Pregnancy] {{char}} has a pregnancy fetish and focuses on the state of being pregnant and gravidity.` },
    corruption: { name: "Развращение", icon: "fa-solid fa-apple-whole", cat: "psych", prompt: `[FETISH: Corruption] {{char}} corrupts innocence.` },
    public: { name: "Публичный", icon: "fa-solid fa-city", cat: "risk", prompt: `[FETISH: Public] {{char}} enjoys public intimacy.` },
    risk: { name: "Риск", icon: "fa-solid fa-eye", cat: "risk", prompt: `[FETISH: Risk] {{char}} craves discovery risk.` },
    voyeurism: { name: "Вуайеризм", icon: "fa-solid fa-binoculars", cat: "risk", prompt: `[FETISH: Voyeurism] {{char}} watches others.` },
    anal: { name: "Анал", icon: "fa-solid fa-peach", cat: "body", prompt: `[FETISH: Anal] {{char}} enjoys anal.` },
    hair: { name: "Волосы (голова)", icon: "fa-solid fa-wand-magic-sparkles", cat: "body", prompt: `[FETISH: Long hair] {{char}} loves long hair on girls.` },
    impact: { name: "Шлепки", icon: "fa-solid fa-hand", cat: "body", prompt: `[FETISH: Impact] {{char}} enjoys spanking.` },
    groping: { name: "Лапанье", icon: "fa-solid fa-hands", cat: "body", prompt: `[FETISH: Groping] {{char}} touches constantly.` },
    breasts: { name: "Грудь", icon: "fa-solid fa-lemon", cat: "body", prompt: `[FETISH: Breasts] {{char}} obsessed with big breasts.` },
    foot: { name: "Ноги (фут-фетиш)", icon: "fa-solid fa-socks", cat: "body", prompt: `[FETISH: Foot] {{char}} enjoys feet.` },
    blindfold: { name: "Повязка", icon: "fa-solid fa-eye-slash", cat: "sense", prompt: `[FETISH: Blindfold] {{char}} enjoys blindfolds.` },
    mirror: { name: "Зеркала", icon: "fa-solid fa-clone", cat: "sense", prompt: `[FETISH: Mirror] {{char}} watches in mirrors.` },
    toys: { name: "Игрушки", icon: "fa-solid fa-ribbon", cat: "sense", prompt: `[FETISH: Toys] {{char}} uses toys.` },
    roleplay: { name: "Ролеплей", icon: "fa-solid fa-masks-theater", cat: "sense", prompt: `[FETISH: Roleplay] {{char}} enjoys roles.` },
    petplay: { name: "Петплей", icon: "fa-solid fa-paw", cat: "sense", prompt: `[FETISH: Petplay] {{char}} enjoys pet play.` },
    aftercare: { name: "Aftercare", icon: "fa-solid fa-heart-pulse", cat: "rel", prompt: `[FETISH: Aftercare] {{char}} gives aftercare.` },
    dirty_talk: { name: "Грязные разговоры", icon: "fa-solid fa-comment-dots", cat: "rel", prompt: `[FETISH: Dirty Talk] {{char}} talks dirty.` },
    worship: { name: "Поклонение", icon: "fa-solid fa-hand-holding-heart", cat: "rel", prompt: `[FETISH: Worship] {{char}} worships partner.` },

    // ========== НОВЫЕ ФЕТИШИ (ПЕРВАЯ ПАРТИЯ) ==========
    cuckold: { name: "Куколд", icon: "fa-solid fa-people-arrows", cat: "power", prompt: `[FETISH: Cuckold] {{char}} gets aroused by watching or knowing their partner has sex with someone else, feeling humiliation and pleasure.` },
    strength_fetish: { name: "Фетиш силы", icon: "fa-solid fa-hand-fist", cat: "power", prompt: `[FETISH: Strength] {{char}} is aroused by lifting and carrying their partner, or displaying physical power.` },
    abasiophilia: { name: "Абазиофилия", icon: "fa-solid fa-wheelchair", cat: "psych", prompt: `[FETISH: Abasiophilia] {{char}} is attracted to people with physical disabilities or those using orthopedic devices.` },
    ahegao: { name: "Ахэгао", icon: "fa-solid fa-face-surprise", cat: "psych", prompt: `[FETISH: Ahegao] {{char}} makes an exaggerated orgasmic face (rolled-back eyes, tongue out) during sexual pleasure.` },
    hybristophilia: { name: "Гибристофилия", icon: "fa-solid fa-gavel", cat: "psych", prompt: `[FETISH: Hybristophilia] {{char}} is sexually attracted to criminals or people who have committed violent acts.` },
    crush_fetish: { name: "Краш-фетиш", icon: "fa-solid fa-shoe-prints", cat: "psych", prompt: `[FETISH: Crush] {{char}} gets aroused by watching someone crush objects (food, insects) with their feet.` },
    masophilia: { name: "Мазофилия (грудь)", icon: "fa-solid fa-chest", cat: "psych", prompt: `[FETISH: Masophilia] {{char}} has a strong sexual attraction to breasts.` },
    narratophilia: { name: "Нарратофилия (грязные разговоры)", icon: "fa-solid fa-message", cat: "psych", prompt: `[FETISH: Narratophilia] {{char}} becomes aroused by speaking or listening to dirty/obscene words and stories.` },
    nyotaimori: { name: "Нётаймори (суши на теле)", icon: "fa-solid fa-fish", cat: "psych", prompt: `[FETISH: Nyotaimori] {{char}} enjoys serving food (especially sushi) on a naked female body, or being served that way.` },
    nantaimori: { name: "Нантаймори (суши на теле, муж.)", icon: "fa-solid fa-fish", cat: "psych", prompt: `[FETISH: Nantaimori] {{char}} enjoys serving food on a naked male body.` },
    objectophilia: { name: "Объектофилия", icon: "fa-solid fa-couch", cat: "psych", prompt: `[FETISH: Objectophilia] {{char}} has romantic or sexual attraction to inanimate objects.` },
    omorashi: { name: "Омораси", icon: "fa-solid fa-droplet", cat: "psych", prompt: `[FETISH: Omorashi] {{char}} is aroused by a full bladder or the act of urination (holding, desperation, or wetting).` },
    pygmalionism: { name: "Пигмалионизм (статуи)", icon: "fa-solid fa-venus-mars", cat: "psych", prompt: `[FETISH: Pygmalionism] {{char}} is attracted to statues, mannequins, or sculptures.` },
    robot_fetish: { name: "Робот-фетишизм", icon: "fa-solid fa-robot", cat: "psych", prompt: `[FETISH: Robot/ASFR] {{char}} is aroused by robots, androids, or humans behaving like robots.` },
    salirophilia: { name: "Салирофилия (грязный секс)", icon: "fa-solid fa-biohazard", cat: "psych", prompt: `[FETISH: Salirophilia] {{char}} gets aroused by soiling or being soiled by dirt, mud, or other substances.` },
    trichophilia_general: { name: "Трихофилия (волосы общая)", icon: "fa-solid fa-feather", cat: "psych", prompt: `[FETISH: Trichophilia] {{char}} has a fetish for hair on any part of the body (head, pubic, armpit, chest, etc.).` },
    trichophilia_head: { name: "Волосы (голова) [отд.]", icon: "fa-solid fa-feather-pointed", cat: "psych", prompt: `[FETISH: Hair (head)] {{char}} is obsessed with long, thick, or styled hair on the head.` },
    trichophilia_pubic: { name: "Волосы (лобок)", icon: "fa-solid fa-feather", cat: "psych", prompt: `[FETISH: Pubic hair] {{char}} is aroused by pubic hair, its grooming or natural state.` },
    trichophilia_armpit: { name: "Волосы (подмышки)", icon: "fa-solid fa-feather", cat: "psych", prompt: `[FETISH: Armpit hair] {{char}} finds armpit hair extremely erotic.` },
    maskalagnia: { name: "Маскалагния (подмышки)", icon: "fa-solid fa-hand-peace", cat: "psych", prompt: `[FETISH: Armpits (Maskalagnia)] {{char}} is aroused by armpits — their look, smell, or touch.` },
    public_wetlook: { name: "Wetlook (мокрая одежда)", icon: "fa-solid fa-water", cat: "risk", prompt: `[FETISH: Wetlook] {{char}} is aroused by seeing or wearing wet clothing (transparent, clinging to body).` },
    wam: { name: "WAM (Wet And Messy)", icon: "fa-solid fa-paintbrush", cat: "risk", prompt: `[FETISH: WAM (Wet and Messy)] {{char}} enjoys getting wet and messy with substances like mud, foam, paint, or food.` },
    hand_fetish: { name: "Хенд-фетишизм (руки)", icon: "fa-solid fa-hand-back-fist", cat: "body", prompt: `[FETISH: Hands] {{char}} has a strong attraction to hands — their shape, movements, or touch.` },
    foot_fetish_ext: { name: "Фут-фетишизм", icon: "fa-solid fa-shoe-prints", cat: "body", prompt: `[FETISH: Feet] {{char}} is sexually aroused by feet, toes, or footwear.` },
    medical_fetish: { name: "Медицинский фетишизм", icon: "fa-solid fa-stethoscope", cat: "body", prompt: `[FETISH: Medical] {{char}} is aroused by medical procedures, uniforms (nurse/doctor), exams, or clinical settings.` },
    catsuit_fetish: { name: "Кэтсьют (костюм кошки)", icon: "fa-solid fa-cat", cat: "body", prompt: `[FETISH: Catsuit] {{char}} is aroused by wearing or seeing a catsuit (tight, often latex or leather full-body suit).` },
    smoking_fetish: { name: "Курительный фетишизм (капнолагния)", icon: "fa-solid fa-smoking", cat: "sense", prompt: `[FETISH: Smoking (Capnolagnia)] {{char}} gets aroused by watching someone smoke, or by the act of smoking itself.` },

    // ========== ВТОРАЯ БОЛЬШАЯ ПАРТИЯ ==========
    chastity: { name: "Chastity (клетка/пояс)", icon: "fa-solid fa-lock", cat: "power", prompt: `[FETISH: Chastity] {{char}} is aroused by enforced chastity — wearing a chastity cage/belt, orgasm denial, and control over partner's sexual release.` },
    cfnm: { name: "CFNM (одетая женщина, голый мужчина)", icon: "fa-solid fa-person-walking-dotted-line", cat: "power", prompt: `[FETISH: CFNM] {{char}} enjoys scenarios where women are fully clothed while men are naked, often with a power dynamic.` },
    cmnf: { name: "CMNF (одетый мужчина, голая женщина)", icon: "fa-solid fa-person-walking-dotted-line", cat: "power", prompt: `[FETISH: CMNF] {{char}} is aroused by situations where men are clothed and women are naked, emphasizing vulnerability and exhibitionism.` },
    public_disgrace: { name: "Public Disgrace (публичный позор)", icon: "fa-solid fa-eye", cat: "risk", prompt: `[FETISH: Public Disgrace] {{char}} gets aroused by public humiliation, exposure, and degradation in front of others.` },
    exhibitionism: { name: "Эксгибиционизм", icon: "fa-solid fa-eye", cat: "risk", prompt: `[FETISH: Exhibitionism] {{char}} gains sexual pleasure from exposing their genitals in public or to strangers.` },
    switch_role: { name: "Свитч (переключение ролей)", icon: "fa-solid fa-arrows-spin", cat: "power", prompt: `[FETISH: Switch] {{char}} enjoys both dominant and submissive roles, freely switching depending on mood or partner.` },
    abdl: { name: "ABDL (взрослый малыш/подгузники)", icon: "fa-solid fa-baby-carriage", cat: "psych", prompt: `[FETISH: ABDL] {{char}} is aroused by wearing diapers, acting as a baby, or being cared for as an adult baby.` },
    altocalciphilia: { name: "Алтокальцифилия (высокие каблуки)", icon: "fa-solid fa-shoe-prints", cat: "psych", prompt: `[FETISH: Altocalciphilia] {{char}} is aroused by high heels, especially when they cause pain or are used to dominate.` },
    animal_training: { name: "Animal Training (дрессировка животных)", icon: "fa-solid fa-dog", cat: "psych", prompt: `[FETISH: Animal Training] {{char}} enjoys roleplaying as an animal trainer, giving commands and conditioning their partner (animal role).` },
    cei: { name: "CEI (Cum Eating Instructions)", icon: "fa-solid fa-utensils", cat: "psych", prompt: `[FETISH: CEI] {{char}} is aroused by instructing someone to eat their own ejaculate after orgasm.` },
    ddlg: { name: "DDLG / CGL (Папочка/Малышка)", icon: "fa-solid fa-family", cat: "psych", prompt: `[FETISH: DDLG/CGL] {{char}} engages in caregiver/little dynamics — one partner acts as a nurturing parent figure, the other as a childlike little.` },
    fwb: { name: "FWB (друзья с выгодой)", icon: "fa-solid fa-handshake", cat: "rel", prompt: `[FETISH: FWB] {{char}} prefers friends-with-benefits relationships — sexual intimacy without romantic commitment.` },
    joi: { name: "JOI (Jerk Off Instructions)", icon: "fa-solid fa-message", cat: "psych", prompt: `[FETISH: JOI] {{char}} gives detailed instructions on how, when, and how fast to masturbate.` },
    mba: { name: "MBA (женат, но доступен)", icon: "fa-solid fa-ring", cat: "rel", prompt: `[FETISH: MBA] {{char}} is married but available for extramarital sexual encounters, often with secrecy.` },
    nsa: { name: "NSA (секс без обязательств)", icon: "fa-solid fa-hand-peace", cat: "rel", prompt: `[FETISH: NSA] {{char}} seeks "no strings attached" sexual relationships — no emotional commitment.` },
    ons: { name: "ONS (One Night Stand)", icon: "fa-solid fa-moon", cat: "rel", prompt: `[FETISH: ONS] {{char}} enjoys one-night stands — brief, anonymous sexual encounters.` },
    polyamory: { name: "Полиамория", icon: "fa-solid fa-hearts", cat: "rel", prompt: `[FETISH: Polyamory] {{char}} engages in consensual, ethical non-monogamy with multiple loving partners.` },
    sissy: { name: "Sissy (феминизация)", icon: "fa-solid fa-venus", cat: "psych", prompt: `[FETISH: Sissy] {{char}} is aroused by forced feminization, crossdressing, and being treated as a girl/woman.` },
    sph: { name: "SPH (Small Penis Humiliation)", icon: "fa-solid fa-ruler-combined", cat: "psych", prompt: `[FETISH: SPH] {{char}} enjoys being humiliated and laughed at for having a small penis.` },
    teamviewer: { name: "Teamviewer/AnyDesk сессия", icon: "fa-solid fa-desktop", cat: "psych", prompt: `[FETISH: Remote Access] {{char}} is aroused by giving remote access to their computer, exposing personal files and browsing history.` },
    subspace: { name: "Сабспейс (изменённое сознание)", icon: "fa-solid fa-brain", cat: "psych", prompt: `[FETISH: Subspace] {{char}} seeks a trance-like state of altered consciousness, losing sensitivity and self-control during BDSM scenes.` },
    apotemnophilia: { name: "Апотемнофилия (свои несовершенства)", icon: "fa-solid fa-band-aid", cat: "psych", prompt: `[FETISH: Apotemnophilia] {{char}} is aroused by their own amputations, disabilities, or perceived imperfections.` },
    heterochromophilia: { name: "Гетерохромофилия (разный цвет кожи)", icon: "fa-solid fa-palette", cat: "psych", prompt: `[FETISH: Heterochromophilia] {{char}} is sexually attracted to partners with a different skin color.` },
    gerontophilia: { name: "Геронтофилия (пожилые люди)", icon: "fa-solid fa-user-old", cat: "psych", prompt: `[FETISH: Gerontophilia] {{char}} is aroused by elderly people (old age).` },
    homesvestism: { name: "Гомесвестизм (одежда кумира)", icon: "fa-solid fa-shirt", cat: "psych", prompt: `[FETISH: Homesvestism] {{char}} gains sexual pleasure from wearing clothes of the same gender but belonging to a celebrity or loved one.` },
    candaulism: { name: "Кандаулезизм (демонстрация партнёрши)", icon: "fa-solid fa-camera", cat: "psych", prompt: `[FETISH: Candaulism] {{char}} is aroused by showing off their naked partner (or partner's photos) to others.` },
    coprophilia: { name: "Копрофилия (фекалии)", icon: "fa-solid fa-toilet", cat: "psych", prompt: `[FETISH: Coprophilia] {{char}} is aroused by feces — watching, smearing, or interacting with it.` },
    nasolingus: { name: "Насолингус (нос)", icon: "fa-solid fa-nose", cat: "psych", prompt: `[FETISH: Nasolingus] {{char}} enjoys licking, biting, or sucking a partner's nose for sexual satisfaction.` },
    necrophilia: { name: "Некрофилия (трупы)", icon: "fa-solid fa-skull", cat: "psych", prompt: `[FETISH: Necrophilia] {{char}} is sexually attracted to corpses.` },
    oculolinctus: { name: "Окулолингус (лижение глаз)", icon: "fa-solid fa-eye", cat: "psych", prompt: `[FETISH: Oculolinctus] {{char}} is aroused by licking or sucking a partner's eyeballs.` },
    retifism: { name: "Ретифизм (обувь)", icon: "fa-solid fa-boot", cat: "psych", prompt: `[FETISH: Retifism] {{char}} has a fetish for shoes (especially women's heels, boots).` },
    plushophilia: { name: "Плюшефилия (плюшевые игрушки)", icon: "fa-solid fa-bear", cat: "psych", prompt: `[FETISH: Plushophilia] {{char}} is sexually attracted to stuffed animals, especially teddy bears.` },
    urophilia: { name: "Урофилия (мочеиспускание на партнёра)", icon: "fa-solid fa-droplet", cat: "psych", prompt: `[FETISH: Urophilia] {{char}} is aroused by urinating on a partner or being urinated on.` },
    transvestic_fetishism: { name: "Фетишистский трансвестизм", icon: "fa-solid fa-tshirt", cat: "psych", prompt: `[FETISH: Transvestic Fetishism] {{char}} achieves sexual arousal by dressing in clothes of the opposite gender.` },
    forniphilia: { name: "Форнифилия (предмет мебели)", icon: "fa-solid fa-chair", cat: "psych", prompt: `[FETISH: Forniphilia] {{char}} gets aroused by being used as a piece of furniture (table, chair, etc.) by a dominant partner.` },
    formicophilia: { name: "Формикофилия (насекомые)", icon: "fa-solid fa-bug", cat: "psych", prompt: `[FETISH: Formicophilia] {{char}} is aroused by small insects crawling on their body.` },
    frottage: { name: "Фроттеуризм (трение в транспорте)", icon: "fa-solid fa-train", cat: "psych", prompt: `[FETISH: Frottage] {{char}} gains sexual pleasure by rubbing genitals against a non-consenting person (often in public transport).` },
    cisvestism: { name: "Цисвестизм (лохмотья/детская одежда)", icon: "fa-solid fa-child", cat: "psych", prompt: `[FETISH: Cisvestism] {{char}} is aroused by wearing rags of a beggar or clothes of the opposite age (adult in child's clothing).` },
    anal_training: { name: "Anal training", icon: "fa-solid fa-bullseye", cat: "body", prompt: `[FETISH: Anal Training] {{char}} enjoys gradually stretching the anus to extreme sizes using commands and toys.` },
    bastinado: { name: "Бастинадо (удары по подошвам)", icon: "fa-solid fa-shoe-prints", cat: "body", prompt: `[FETISH: Bastinado] {{char}} is aroused by striking the soles of the feet with paddles, canes, etc.` },
    birching: { name: "Birching (бичевание берёзой)", icon: "fa-solid fa-tree", cat: "body", prompt: `[FETISH: Birching] {{char}} enjoys being flogged with birch branches (or doing the flogging).` },
    cock_balls_torture: { name: "CBT (Cock & Balls Torture)", icon: "fa-solid fa-bolt", cat: "body", prompt: `[FETISH: CBT] {{char}} is aroused by inflicting or receiving pain on the penis and testicles.` },
    cuntbusting: { name: "Cuntbusting (удары по промежности)", icon: "fa-solid fa-fist-raised", cat: "body", prompt: `[FETISH: Cuntbusting] {{char}} enjoys striking the female genitals and perineum.` },
    facesitting: { name: "Facesitting (сидение на лице)", icon: "fa-solid fa-face-smile", cat: "body", prompt: `[FETISH: Facesitting] {{char}} enjoys sitting on their partner's face, often for oral sex or dominance.` },
    queening: { name: "Queening (оральный секс по принуждению)", icon: "fa-solid fa-crown", cat: "body", prompt: `[FETISH: Queening] {{char}} practices forced oral sex where the dominant woman sits on the submissive's face.` },
    tickling: { name: "Tickling (тиклинг)", icon: "fa-solid fa-feather", cat: "body", prompt: `[FETISH: Tickling] {{char}} is aroused by tickling a partner (or being tickled) as a BDSM activity.` },
    tamakeri: { name: "Тамакэри (удары по мошонке)", icon: "fa-solid fa-kick", cat: "body", prompt: `[FETISH: Tamakeri] {{char}} enjoys slapping, kicking, or squeezing the scrotum to cause mild to severe pain.` },
    trampling: { name: "Трамплинг (быть растоптанным)", icon: "fa-solid fa-shoe-prints", cat: "body", prompt: `[FETISH: Trampling] {{char}} is aroused by being stepped on (barefoot, heels, boots) by a partner.` },
    fisting: { name: "Фистинг (кулак)", icon: "fa-solid fa-hand-fist", cat: "body", prompt: `[FETISH: Fisting] {{char}} enjoys inserting a whole hand (or fist) into the vagina or anus.` },
    flagellation: { name: "Флагелляция (порка)", icon: "fa-solid fa-whip", cat: "body", prompt: `[FETISH: Flagellation] {{char}} is aroused by flogging or whipping a submissive partner.` },
    breath_control: { name: "Breath control (игры с дыханием)", icon: "fa-solid fa-lungs", cat: "sense", prompt: `[FETISH: Breath Control] {{char}} enjoys temporary asphyxiation (choking, gas masks, strangulation) for sexual arousal.` },
    mummification: { name: "Mummification (мумификация)", icon: "fa-solid fa-bandage", cat: "sense", prompt: `[FETISH: Mummification] {{char}} is aroused by being tightly wrapped/immobilized like a mummy, often with sensory deprivation.` },
    sensory_deprivation: { name: "Sensory Deprivation (сенсорная депривация)", icon: "fa-solid fa-ear-deaf", cat: "sense", prompt: `[FETISH: Sensory Deprivation] {{char}} enjoys being deprived of sight, hearing, or movement using blindfolds, hoods, gags, earplugs.` },
    wax_play: { name: "Wax play (игры с воском)", icon: "fa-solid fa-candle", cat: "sense", prompt: `[FETISH: Wax Play] {{char}} is aroused by dripping melted wax (usually from candles) onto a partner's skin.` },
    looner: { name: "Лунеры (воздушные шары)", icon: "fa-solid fa-balloon", cat: "sense", prompt: `[FETISH: Looner] {{char}} has a fetish for balloons — inflating, popping, or rubbing them.` },
    shibari: { name: "Шибари (японское связывание)", icon: "fa-solid fa-rope", cat: "sense", prompt: `[FETISH: Shibari] {{char}} is aroused by the artistic and intricate rope bondage (Japanese style).` },
    furry: { name: "Фури (костюмы животных)", icon: "fa-solid fa-paw", cat: "sense", prompt: `[FETISH: Furry] {{char}} is aroused by wearing animal costumes (fursuits) or roleplaying as anthropomorphic animals.` },
    gangbang: { name: "Гэнгбэнг (один мужчина с женщинами)", icon: "fa-solid fa-people-group", cat: "rel", prompt: `[FETISH: Gangbang] {{char}} is aroused by group sex with one woman and multiple men.` },
    reverse_gangbang: { name: "Обратный гэнгбэнг (один мужчина с женщинами)", icon: "fa-solid fa-people-arrows", cat: "rel", prompt: `[FETISH: Reverse Gangbang] {{char}} enjoys group sex with one man and multiple women (a royal gangbang).` }
};

const CATEGORIES = {
    power: { name: "Власть", icon: "fa-solid fa-link" },
    psych: { name: "Психология", icon: "fa-solid fa-brain" },
    risk: { name: "Риск", icon: "fa-solid fa-eye" },
    body: { name: "Тело", icon: "fa-solid fa-heart" },
    sense: { name: "Сенсорика", icon: "fa-solid fa-wand-sparkles" },
    rel: { name: "Отношения", icon: "fa-solid fa-heart-pulse" }
};

let state = {
    enabled: true,
    active: [],
    intensity: 'medium',
    chance: 70,
    custom: [],
    showFloating: true,
    minContextLength: 0,
    cooldownMessages: 0,
    requireSexualHint: false,
    lastTriggerMessageId: null
};

function load() { try { const s = localStorage.getItem('fm'); if(s) state = {...state, ...JSON.parse(s)}; } catch(e){} }
function save() { localStorage.setItem('fm', JSON.stringify(state)); }

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
        "поцелу", "прикос", "кровать", "стон", "кончить"
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

function buildPrompt() {
    if (!state.enabled || !state.active.length) return '';

    if (state.minContextLength > 0) {
        const historyLen = getChatHistoryLength();
        if (historyLen < state.minContextLength) {
            console.log(`[Fetish Manager] Context too short: ${historyLen} < ${state.minContextLength}, skipping`);
            return '';
        }
    }
    if (isCooldownActive()) {
        console.log(`[Fetish Manager] Cooldown active, skipping`);
        return '';
    }
    if (state.requireSexualHint && !hasUserSexualHint()) {
        console.log(`[Fetish Manager] No sexual hint in last user message, skipping`);
        return '';
    }

    const intensityMap = {
        low: 'very subtle hints, barely noticeable',
        medium: 'moderate, naturally woven into the scene',
        high: 'strongly expressed, heavy focus on the fetish'
    };

    let fetishList = [];
    state.active.forEach(k => {
        if (FETISHES[k]) fetishList.push(FETISHES[k].prompt);
        const c = state.custom.find(f => f.id === k);
        if (c) fetishList.push(c.prompt);
    });

    const roll = Math.floor(Math.random() * 100) + 1;
    const triggered = roll <= state.chance;

    const randomFetishKey = state.active[Math.floor(Math.random() * state.active.length)];
    const randomFetish = FETISHES[randomFetishKey] || state.custom.find(f => f.id === randomFetishKey);

    if (triggered && state.cooldownMessages > 0) {
        const currentId = getLastMessageId();
        state.lastTriggerMessageId = currentId;
        save();
    }

    let p = `[OOC: FETISH SYSTEM — STRICT COMPLIANCE REQUIRED]
Roll: ${roll}/100 (threshold: ${state.chance}%)
Result: ${triggered ? `TRIGGERED → apply "${randomFetish?.name || randomFetishKey}"` : `NOT TRIGGERED → write vanilla scene`}
Intensity: ${state.intensity} (${intensityMap[state.intensity]})

Active fetishes for reference:
${fetishList.join('\n')}

${triggered
    ? `RULES (fetish triggered):
- Weave "${randomFetish?.name || randomFetishKey}" into the scene through actions, body language, dialogue subtext — never name the fetish explicitly
- Match intensity level: low = fleeting micro-detail; medium = a recurring undercurrent; high = a central driver of the scene
- If the current context is non-intimate, plant subtle foreshadowing or tension that hints at this fetish without forcing a sexual scene`
    : `RULES (fetish NOT triggered):
- Write a completely vanilla scene with zero fetish content
- Do not sneak in hints, teasing, or "lite" versions — the roll failed, respect the result
- Focus on character personality, plot progression, and emotional dynamics instead`}
]
`;
    return p;
}

function apply() {
    const prompt = buildPrompt();
    setExtensionPrompt(extensionName, prompt, extension_prompt_types.IN_CHAT, 0);
    console.log('[Fetish Manager] Prompt applied:', prompt ? 'YES' : 'empty');
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

jQuery(async () => {
    try {
        load();

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
        $miniBtn.on('click touchend', function(e) {
            if (!miniClickAllowed) return;
            e.preventDefault();
            e.stopPropagation();
            $panel.toggleClass('fm-hidden');
        });

        $('#fm-minimize').on('click touchend', function(e) {
            e.preventDefault();
            $panel.addClass('fm-hidden');
        });

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

        $(document).on('click touchend', '.fm-fetish-btn', function(e) {
            e.preventDefault();
            toggle($(this).data('key'));
        });

        $(document).on('click touchend', '.fm-tag', function(e) {
            e.preventDefault();
            toggle($(this).data('key'));
        });

        $('#fm-clear').on('click touchend', function(e) {
            e.preventDefault();
            state.active = [];
            updateUI();
            apply();
            save();
            notify('Очищено');
        });

        $('#fm-add-custom').on('click touchend', function(e) {
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
                prompt: `[FETISH: ${name.trim()}] ${desc.trim()}`
            });
            save();
            updateUI();
            notify(`+ ${name.trim()}`);
        });

        $(document).on('click touchend', '.fm-custom-name', function(e) {
            e.preventDefault();
            const id = $(this).closest('.fm-custom-item').data('id');
            toggle(id);
        });

        $(document).on('click touchend', '.fm-custom-del', function(e) {
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

        const $handle = $('#fm-drag-handle');
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        function getCoords(e) {
            if (e.type.startsWith('touch') && e.touches && e.touches[0]) {
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
            e.preventDefault();
        });

        $(document).on('mousemove touchmove', function(e) {
            if (!isDragging) return;
            const coords = getCoords(e);
            $panel.css({ top: (coords.y - offset.y) + 'px', left: (coords.x - offset.x) + 'px' });
        });

        $(document).on('mouseup touchend', function() {
            isDragging = false;
        });

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
            e.preventDefault();
            e.stopPropagation();
        });

        $(document).on('mousemove touchmove', function(e) {
            if (!isMiniDragging) return;
            miniMoved = true;
            miniClickAllowed = false;
            const coords = getCoords(e);
            $miniBtn.css({ top: (coords.y - miniOffset.y) + 'px', left: (coords.x - miniOffset.x) + 'px' });
            e.preventDefault();
        });

        $(document).on('mouseup touchend', function() {
            if (isMiniDragging) {
                isMiniDragging = false;
                if (miniMoved) {
                    setTimeout(() => { miniClickAllowed = true; }, 50);
                }
            }
        });

        updateUI();
        apply();

        eventSource.on(event_types.MESSAGE_SENT, () => {
            console.log('[Fetish Manager] New roll before AI response...');
            apply();
        });

        console.log('[Fetish Manager] v13 Ready! (with context filter)');

    } catch (error) {
        console.error('[Fetish Manager] Error:', error);
    }
});