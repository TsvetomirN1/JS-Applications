export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        teamMember: await this.load('./templates/catalog/teamMember.hbs'),
        teamControls: await this.load('./templates/catalog/teamControls.hbs'),

    };

    const data = {
        teamId,
        name,
        comment,
        members: [
            { username }
        ]

    };
    Object.assign(data, this.app.userData);


    this.partial('./templates/catalog/details.hbs', data);
};