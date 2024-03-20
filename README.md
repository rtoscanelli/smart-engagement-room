# Smart-engagement-room

Website for the Ambient Intelligence Course project

### Web Application

The Website can be accessed here: [Smart Engagement Room](https://smart-engagement-room.vercel.app/).

To authenticate in the website you can use the following credentials:

```
Username: grupo6
Password: ami
```

It is composed by 4 Webpages:
- Home | Dashboard - Page with the statistics to be shown to the professor after a lecture.
- Attendance - Page with the attedances or absences of students.
- Classroom Layout - Page with the representation of the classroom layout and with reactive lights
and hands gesture detection.
- Admin - This page is used for development and presentation purposes. In real world it should not be visible.

The Website is hosted online in the [Vercel Platform](https://vercel.com).
It communicates with a database hosted in a [Mongo Atlas Clust](https://www.mongodb.com/atlas),
that stores the statistics to be shown in the website.

#### Run Locally

To run the website in your local machine you should first install [NodeJS](https://nodejs.org/en) and [npmJS](https://www.npmjs.com/).

To run the website:

```bash
npm run start
```
The database connection is already setup with no interventation needed.
