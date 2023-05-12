export const adminMenu = [
    { //Users systems
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.admin.doctor-manage', link: '/system/manage-doctor',
            },
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-doctor-schedule',

            },
            {
                name: 'menu.admin.crud', link: '/system/user-manage',

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',

            }
        ]
    },
    { //Clinic
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.clinic-manage', link: '/clinic/manage-clinic',
            },
        ]
    },
    { //Specialty
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.specialty-manage', link: '/specialty/manage-specialty',
            },
        ]
    },
    { //Handbook
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.handbook-manage', link: '/',
            },
        ]
    },
];

export const doctorMenu = [
    { //Users systems
        name: 'menu.doctor.manage-doctor',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-doctor-schedule',

            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient',

            }
        ]
    },

];