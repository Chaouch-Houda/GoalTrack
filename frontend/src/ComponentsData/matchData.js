import france from '../assets/images/france.jpg'
import espagne from '../assets/images/espagne.jpg'
import Angleterre from '../assets/images/Angleterre.jpg'
import allemangne from '../assets/images/allemangne.jpg'
import us from '../assets/images/US.jpg'
import video1 from '../assets/videos/Manchester United 3-2 Liverpool .mp4'
import video2 from '../assets/videos/Barcelona 2-1 Real Madrid .mp4'
import video3 from '../assets/videos/video4.mp4'
import video4 from '../assets/videos/Bayern vs. Paris Saint-Germain 2-0.mp4'

export const matchData = [
    {
      id:'1',
      type:'football',
      team1 : {name:'Manchester United',src:Angleterre,alt:'Angleterre'},
      team2 : {name:'Liverpool',src:Angleterre,alt:'Angleterre'},
      matchdate: 'May 17, 2023, 05:10 am',
      matchVideo:{src:video1},
      // generalStats: [
      //   ['Final Score', '3','2'],
      //   ['Possession', '58%','42%'],
      //   ['Total Shots', '18','14'],
      //   ['Shots on Target', '10','8'],
      //   ['Shots off Target', '8','6'],
      //   ['Corners', '6','4'],
      //   ['Fouls Committed', '  15','12'],
      //   ['Offsides', '3','2'],
      // ],
      generalStats: {
        'Manchester United':[
          ['Final Score','3'],
          ['Possession','58%'],
          ['Total Shots','18'],
          ['Shots on Target','10'],
          ['Shots off Target','8'],
          ['Corners','6'],
          ['Fouls Committed','15'],
          ['Offsides','3'],
        ],
        'Liverpool':[
          ['Final Score','2'],
          ['Possession','42%'],
          ['Total Shots','14'],
          ['Shots on Target','8'],
          ['Shots off Target','6'],
          ['Corners','4'],
          ['Fouls Committed','12'],
          ['Offsides','2'],
        ]
      },
      teamStats: {
        'Manchester United': [
          ['Goals Scored', 3],
          ['Assists', 2],
          ['Shots on Target/Shots Total', '10/8'],
          ['Possession', '58%'],
          ['Fouls Committed', 15],
          ['Yellow Cards', 2],
          ['Red Cards', 0],
          ['Corners Earned', 6],
        ],
        'Liverpool': [
          ['Goals Scored', 2],
          ['Assists', 1],
          ['Shots on Target/Shots Total', '8/6'],
          ['Possession', '42%'],
          ['Fouls Committed', 12],
          ['Yellow Cards', 3],
          ['Red Cards', 0],
          ['Corners Earned', 4],
        ],
      },

      keyPlayerStats: { //( les joueurs ayant effectué le plus de passes réussies)
        tab1: [
          {
          name: 'Cristiano Ronaldo',
          team: 'Manchester United',
          stats:[
            ['Goals Scored', 2],
            ['Assists', 1],
            ['Shots on Target/Shots Total', '6/4'],
            ['Possession', '20%'],
            ['Fouls Committed', 1],
          ]
          },
          {
            name: 'Mohamed Salah',
            team: 'Liverpool',
            stats:[
              ['Goals Scored', 1],
              ['Assists', 0],
              ['Shots on Target/Shots Total', '4/3'],
              ['Possession', '18%'],
              ['Fouls Committed', 2],
            ]
          }
        ],
        tab2: [
          {
            name:'Paul Pogba',
            team:'Manchester United',
            stats:[
              ['Successful Passes/Total Passes', '65/75'],
              ['Successful Dribbles/Attempts', '7/9'],
              ['Duels Won/Lost', '12/4'],
              ['Interceptions', 3],
              ['Distance Covered', '11.2 km'],
            ]
          },
          {
            name:'Virgil van Dijk',
            team:'Liverpool',
            stats:[
              ['Interceptions', 4],
              ['Duels Won/Lost', '8/5'],
              ['Successful Passes/Total Passes', '50/55'],
              ['Successful Dribbles/Attempts', '0/1'],
              ['Fouls Committed', 3],
            ]
          }
        ]
        // 'Cristiano Ronaldo (Manchester United)': [
        //   ['Goals Scored', 2],
        //   ['Assists', 1],
        //   ['Shots on Target/Shots Total', '6/4'],
        //   ['Possession', '20%'],
        //   ['Fouls Committed', 1],
        // ],
        // 'Mohamed Salah (Liverpool)': [
        //   ['Goals Scored', 1],
        //   ['Assists', 0],
        //   ['Shots on Target/Shots Total', '4/3'],
        //   ['Possession', '18%'],
        //   ['Fouls Committed', 2],
        // ],
        // 'Paul Pogba (Manchester United)': [
        //   ['Successful Passes/Total Passes', '65/75'],
        //   ['Successful Dribbles/Attempts', '7/9'],
        //   ['Duels Won/Lost', '12/4'],
        //   ['Interceptions', 3],
        //   ['Distance Covered', '11.2 km'],
        // ],
        // 'Virgil van Dijk (Liverpool)': [
        //   ['Interceptions', 4],
        //   ['Duels Won/Lost', '8/5'],
        //   ['Successful Passes/Total Passes', '50/55'],
        //   ['Successful Dribbles/Attempts', '0/1'],
        //   ['Fouls Committed', 3],
        // ],
      },
      goalkeeperStats: {
        'David De Gea (Manchester United)': [
          ['Saves', 6],
          ['Reflex Saves', 3],
          ['Punches', 2],
          ['Claims', 1],
          ['Successful Passes/Total Passes', '18/21'],
        ],
        'Alisson Becker (Liverpool)': [
          ['Saves', 4],
          ['Reflex Saves', 2],
          ['Punches', 1],
          ['Claims', 3],
          ['Successful Passes/Total Passes', '25/28'],
        ],
      },
      defensiveStats: {
        'Harry Maguire (Manchester United)': [
          ['Successful Tackles/Attempts', '4/5'],
          ['Clearances', 7],
          ['Interceptions', 2],
          ['Fouls Committed', 1],
          ['Duels Won/Lost', '8/2'],
        ],
        'Trent Alexander-Arnold (Liverpool)': [
          ['Successful Tackles/Attempts', '3/4'],
          ['Clearances', 5],
          ['Interceptions', 1],
          ['Fouls Committed', 2],
          ['Duels Won/Lost', '6/3'],
        ],
      },
      midfieldStats: {
        'Bruno Fernandes (Manchester United)': [
          ['Successful Passes/Total Passes', '55/60'],
          ['Successful Dribbles/Attempts', '2/3'],
          ['Duels Won/Lost', '10/5'],
          ['Fouls Committed', 0],
          ['Interceptions', 3],
        ],
        'Fabinho (Liverpool)': [
          ['Successful Passes/Total Passes', '45/50'],
          ['Successful Dribbles/Attempts', '1/1'],
          ['Duels Won/Lost', '9/7'],
          ['Fouls Committed', 2],
          ['Interceptions', 2],
        ],
      },
      attackingStats: {
        'Marcus Rashford (Manchester United)': [
          ['Successful Shots/Total Shots', '3/4'],
          ['Successful Dribbles/Attempts', '4/6'],
          ['Assists', 0],
          ['Fouls Suffered', 2],
          ['Goals Scored', 0],
        ],
        'Diogo Jota (Liverpool)': [
          ['Successful Shots/Total Shots', '2/3'],
          ['Successful Dribbles/Attempts', '3/4'],
          ['Assists', 1],
          ['Fouls Suffered', 1],
          ['Goals Scored', 1],
        ],
      },
    },
    {
      // matchName: 'Real Madrid vs. Barcelona',
      id:'2',
      type:'football',
      team1 : {name:'Real Madrid',src:espagne,alt:'espagne'},
      team2 : {name:'Barcelona',src:espagne,alt:'espagne'},
      matchdate: 'May 17, 2023, 05:10 am',
      matchVideo:{src:video2},
      // generalStats: [
      //   ['Final Score', '2','1'],
      //   ['Possession', '52%','48%'],
      //   ['Total Shots', '15','12'],
      //   ['Shots on Target', '8','6'],
      //   ['Shots off Target', '7','6'],
      //   ['Corners', '5','3'],
      //   ['Fouls Committed', '14','18'],
      //   ['Offsides', '2','3'],
      // ],
      generalStats: {
        'Real Madrid' :[
          ['Final Score', '2'],
          ['Possession', '52%'],
          ['Total Shots', '15'],
          ['Shots on Target', '8'],
          ['Shots off Target', '7'],
          ['Corners', '5'],
          ['Fouls Committed', '14'],
          ['Offsides', '2'],
        ],
        'Barcelona':[
          ['Final Score','1'],
          ['Possession','48%'],
          ['Total Shots','12'],
          ['Shots on Target','6'],
          ['Shots off Target','6'],
          ['Corners','3'],
          ['Fouls Committed','18'],
          ['Offsides','3'],
        ]
      },
      teamStats: {
        'Real Madrid': [
          ['Goals Scored', 2],
          ['Assists', 1],
          ['Shots on Target/Shots Total', '8/6'],
          ['Possession', '52%'],
          ['Fouls Committed', 14],
          ['Yellow Cards', 1],
          ['Red Cards', 0],
          ['Corners Earned', 5],
        ],
        'Barcelona': [
          ['Goals Scored', 1],
          ['Assists', 1],
          ['Shots on Target/Shots Total', '6/5'],
          ['Possession', '48%'],
          ['Fouls Committed', 18],
          ['Yellow Cards', 2],
          ['Red Cards', 0],
          ['Corners Earned', 3],
        ],
      },
      keyPlayerStats:{
          tab1: [
            {
            name: 'Karim Benzema',
            team: 'Real Madrid',
            stats:[
              ['Goals Scored', 1],
              ['Assists', 1],
              ['Shots on Target/Shots Total', '4/6'],
              ['Possession', '15%'],
              ['Fouls Committed', 0],
            ]
            },
            {
              name:'Lionel Messi',
              team:'Barcelona',
              stats:
              [
                ['Goals Scored', 1],
                ['Assists', 1],
                ['Shots on Target/Shots Total', '4/6'],
                ['Possession', '15%'],
                ['Fouls Committed', 0],
              ]
            }
          ],
          tab2: [
            {
              name:'Luka Modric',
              team:'Real Madrid',
              stats:[
                ['Successful Passes/Total Passes', '45/50'],
                ['Successful Dribbles/Attempts', '2/2'],
                ['Duels Won/Lost', '8/5'],
                ['Interceptions', 1],
                ['Distance Covered', '10.5 km'],
              ]
            },
            {
              name:'Frenkie de Jong',
              team:'Barcelona',
              stats:[
                ['Successful Passes/Total Passes', '65/75'],
                ['Successful Dribbles/Attempts', '3/4'],
                ['Duels Won/Lost', '10/5'],
                ['Interceptions', 2],
                ['Distance Covered', '10.8 km'],
              ],
            }
          ]
        },
    //     'Karim Benzema (Real Madrid)': [
    //       ['Goals Scored', 1],
    //       ['Assists', 1],
    //       ['Shots on Target/Shots Total', '4/6'],
    //       ['Possession', '15%'],
    //       ['Fouls Committed', 0],
    //     ],
    //     'Lionel Messi (Barcelona)': [
    //       ['Goals Scored', 1],
    //       ['Assists', 1],
    //       ['Shots on Target/Shots Total', '3/4'],
    //       ['Possession', '20%'],
    //       ['Fouls Committed', 2],
    //     ],
    //     'Luka Modric (Real Madrid)': [
    //       ['Successful Passes/Total Passes', '45/50'],
    //       ['Successful Dribbles/Attempts', '2/2'],
    //       ['Duels Won/Lost', '8/5'],
    //       ['Interceptions', 1],
    //       ['Distance Covered', '10.5 km'],
    //     ],
    //     'Frenkie de Jong (Barcelona)': [
    //       ['Successful Passes/Total Passes', '65/75'],
    //       ['Successful Dribbles/Attempts', '3/4'],
    //       ['Duels Won/Lost', '10/5'],
    //       ['Interceptions', 2],
    //       ['Distance Covered', '10.8 km'],
    //     ],
    //   },
      goalkeeperStats: {
        'Thibaut Courtois (Real Madrid)': [
          ['Saves', 4],
          ['Reflex Saves', 2],
          ['Punches', 1],
          ['Claims', 2],
          ['Successful Passes/Total Passes', '20/24'],
        ],
        'Marc-André ter Stegen (Barcelona)': [
          ['Saves', 5],
          ['Reflex Saves', 3],
          ['Punches', 2],
          ['Claims', 1],
          ['Successful Passes/Total Passes', '28/32'],
        ],
      },
      defensiveStats: {
        'Sergio Ramos (Real Madrid)': [
          ['Successful Tackles/Attempts', '3/4'],
          ['Clearances', 6],
          ['Interceptions', 3],
          ['Fouls Committed', 2],
          ['Duels Won/Lost', '10/5'],
        ],
        'Gerard Piqué (Barcelona)': [
          ['Successful Tackles/Attempts', '2/3'],
          ['Clearances', 5],
          ['Interceptions', 2],
          ['Fouls Committed', 3],
          ['Duels Won/Lost', '6/3'],
        ],
      },
      midfieldStats: {
        'Luka Modric (Real Madrid)': [
          ['Successful Passes/Total Passes', '60/65'],
          ['Successful Dribbles/Attempts', '3/3'],
          ['Duels Won/Lost', '8/5'],
          ['Fouls Committed', 2],
          ['Interceptions', 3],
        ],
        'Sergio Busquets (Barcelona)': [
          ['Successful Passes/Total Passes', '50/55'],
          ['Successful Dribbles/Attempts', '2/2'],
          ['Duels Won/Lost', '9/6'],
          ['Fouls Committed', 1],
          ['Interceptions', 2],
        ],
      },
      attackingStats: {
        'Karim Benzema (Real Madrid)': [
          ['Successful Shots/Total Shots', '4/6'],
          ['Successful Dribbles/Attempts', '2/3'],
          ['Assists', 1],
          ['Fouls Suffered', 3],
          ['Goals Scored', 1],
        ],
        'Lionel Messi (Barcelona)': [
          ['Successful Shots/Total Shots', '3/4'],
          ['Successful Dribbles/Attempts', '4/5'],
          ['Assists', 0],
          ['Fouls Suffered', 1],
          ['Goals Scored', 0],
        ],
      },      
    },
    {
      id: '3',
      type: 'basketball',
      team1: { name: 'Brooklyn Nets', src:us, alt: 'United States' },
      team2: { name: 'Los Angeles Clippers', src:us, alt: 'United States' },
      matchdate: 'August 12, 2023, 10:00 pm',
      matchVideo: { src: video3 },
      // generalStats: [
      //   ['Final Score', '121', '115'],
      //   ['Field Goal Percentage', '49%', '45%'],
      //   ['Three-Pointers Made/Attempted', '14/30', '9/25'],
      //   ['Free Throws Made/Attempted', '19/22', '22/26'],
      //   ['Offensive/Defensive Rebounds', '7/31', '10/32'],
      //   ['Assists', '27', '23'],
      //   ['Turnovers', '10', '13'],
      //   ['Blocks', '4', '5'],
      // ],
      generalStats:{
        'Brooklyn Nets': [
          ['Final Score', '121'],
          ['Field Goal Percentage', '49%'],
          ['Three-Pointers Made/Attempted','14/30'],
          ['Free Throws Made/Attempted', '19/22'],
          ['Offensive/Defensive Rebounds', '7/31'],
          ['Assists', '27'],
          ['Turnovers', '10'],
          ['Blocks', '4'],
        ],
        'Los Angeles Clippers': [
          ['Final Score','115'],
          ['Field Goal Percentage','45%'],
          ['Three-Pointers Made/Attempted','9/25'],
          ['Free Throws Made/Attempted','22/26'],
          ['Offensive/Defensive Rebounds','10/32'],
          ['Assists','23'],
          ['Turnovers','13'],
          ['Blocks','5'],

        ]
      },
      teamStats: {
        'Brooklyn Nets': [
          ['Points Scored', 121],
          ['Field Goal Percentage', '49%'],
          ['Three-Pointers Made/Attempted', '14/30'],
          ['Free Throws Made/Attempted', '19/22'],
          ['Offensive/Defensive Rebounds', '7/31'],
          ['Assists', 27],
          ['Turnovers', 10],
          ['Blocks', 4],
        ],
        'Los Angeles Clippers': [
          ['Points Scored', 115],
          ['Field Goal Percentage', '45%'],
          ['Three-Pointers Made/Attempted', '9/25'],
          ['Free Throws Made/Attempted', '22/26'],
          ['Offensive/Defensive Rebounds', '10/32'],
          ['Assists', 23],
          ['Turnovers', 13],
          ['Blocks', 5],
        ],
      },
      keyPlayerStats: {
      tab1: [
        {
        name: 'Kevin Durant',
        team: 'Brooklyn Nets',
        stats:[
          ['Points Scored', 35],
          ['Assists', 7],
          ['Offensive/Defensive Rebounds', '1/9'],
          ['Steals', 2],
          ['Blocks', 1],
        ],
        },
        {
          name: 'Kawhi Leonard',
          team: 'Los Angeles Clippers',
          stats:[
            ['Points Scored', 30],
            ['Assists', 5],
            ['Offensive/Defensive Rebounds', '2/8'],
            ['Steals', 3],
            ['Blocks', 2],
          ],
        }
      ],
    //     'Kevin Durant (Brooklyn Nets)': [
    //       ['Points Scored', 35],
    //       ['Assists', 7],
    //       ['Offensive/Defensive Rebounds', '1/9'],
    //       ['Steals', 2],
    //       ['Blocks', 1],
    //     ],
    //     'Kawhi Leonard (Los Angeles Clippers)': [
    //       ['Points Scored', 30],
    //       ['Assists', 5],
    //       ['Offensive/Defensive Rebounds', '2/8'],
    //       ['Steals', 3],
    //       ['Blocks', 2],
    //     ],
    //   },
    //   playerStats: {
    //     'James Harden (Brooklyn Nets)': [
    //       ['Points Scored', 25],
    //       ['Offensive/Defensive Rebounds', '1/6'],
    //       ['Assists', 8],
    //       ['Steals', 1],
    //       ['Blocks', 0],
    //     ],
    //     'Paul George (Los Angeles Clippers)': [
    //       ['Points Scored', 27],
    //       ['Offensive/Defensive Rebounds', '2/7'],
    //       ['Assists', 4],
    //       ['Steals', 2],
    //       ['Blocks', 1],
        // ],
      },
    },      
    {
      // matchName: 'Bayern Munich vs. PSG',
      id:'4',
      type:'football',
      team1 : {name:'Bayern Munich',src:allemangne,alt:'allemangne'},
      team2 : {name:'PSG',src:france,alt:'france'},
      matchdate: 'March 8, 2023, 9:00 pm',
      matchVideo:{src:video4},
      // generalStats: [
      //   ['Final Score', '2','0'],
      //   ['Possession', '60%','40%'],
      //   ['Total Shots', '20','15'],
      //   ['Shots on Target', '10','7'],
      //   ['Shots off Target', '10','8'],
      //   ['Corners', '8','5'],
      //   ['Fouls Committed', '12','16'],
      //   ['Offsides', '1','2'],
      // ],
      generalStats:{
        'Bayern Munich': [
          ['Final Score', '2'],
        ['Possession', '60%'],
        ['Total Shots', '20'],
        ['Shots on Target', '10'],
        ['Shots off Target', '10'],
        ['Corners', '8'],
        ['Fouls Committed', '12'],
        ['Offsides', '1'],
        ],
        'PSG': [
          ['Final Score','0'],
          ['Possession','40%'],
          ['Total Shots','15'],
          ['Shots on Target','7'],
          ['Shots off Target','8'],
          ['Corners','5'],
          ['Fouls Committed','16'],
          ['Offsides','2'],
        ]
      },
      teamStats: {
        'Bayern Munich': [
          ['Goals Scored', 2],
          ['Assists', 2],
          ['Shots on Target/Shots Total', '10/8'],
          ['Possession', '60%'],
          ['Fouls Committed', 12],
          ['Yellow Cards', 0],
          ['Red Cards', 0],
          ['Corners Earned', 8],
        ],
        'PSG': [
          ['Goals Scored', 2],
          ['Assists', 2],
          ['Shots on Target/Shots Total', '7/6'],
          ['Possession', '40%'],
          ['Fouls Committed', 16],
          ['Yellow Cards', 2],
          ['Red Cards', 0],
          ['Corners Earned', 5],
        ],
      },
      keyPlayerStats: {
        tab1: [
          {
          name: 'Robert Lewandowski',
          team: 'Bayern Munich',
          stats:[
              ['Goals Scored', 1],
              ['Assists', 1],
              ['Shots on Target/Shots Total', '4/6'],
              ['Possession', '18%'],
              ['Fouls Committed', 1],
            ],
          },
          {
            name: 'Neymar Jr',
            team: 'PSG',
            stats:[
                ['Goals Scored', 1],
                ['Assists', 1],
                ['Shots on Target/Shots Total', '3/4'],
                ['Possession', '15%'],
                ['Fouls Committed', 3],
              ],
          }
        ],
        tab2:[
          {
            name:'Joshua Kimmich',
            team:'Bayern Munich',
            stats:[
              ['Successful Passes/Total Passes', '55/60'],
              ['Successful Dribbles/Attempts', '2/2'],
              ['Duels Won/Lost', '10/5'],
              ['Interceptions', 2],
              ['Distance Covered', '11.8 km'],
            ],
          },
          {
            name:'Marco Verratti',
            team:'PSG',
            stats:[
              ['Successful Passes/Total Passes', '50/55'],
              ['Successful Dribbles/Attempts', '3/4'],
              ['Duels Won/Lost', '8/5'],
              ['Interceptions', 1],
              ['Distance Covered', '11.2 km'],
            ],
          }
        ]
      },
    //     'Robert Lewandowski (Bayern Munich)': [
    //       ['Goals Scored', 1],
    //       ['Assists', 1],
    //       ['Shots on Target/Shots Total', '4/6'],
    //       ['Possession', '18%'],
    //       ['Fouls Committed', 1],
    //     ],
    //     'Neymar Jr (PSG)': [
    //       ['Goals Scored', 1],
    //       ['Assists', 1],
    //       ['Shots on Target/Shots Total', '3/4'],
    //       ['Possession', '15%'],
    //       ['Fouls Committed', 3],
    //     ],
    //     'Joshua Kimmich (Bayern Munich)': [
    //       ['Successful Passes/Total Passes', '55/60'],
    //       ['Successful Dribbles/Attempts', '2/2'],
    //       ['Duels Won/Lost', '10/5'],
    //       ['Interceptions', 2],
    //       ['Distance Covered', '11.8 km'],
    //     ],
    //     'Marco Verratti (PSG)': [
    //       ['Successful Passes/Total Passes', '50/55'],
    //       ['Successful Dribbles/Attempts', '3/4'],
    //       ['Duels Won/Lost', '8/5'],
    //       ['Interceptions', 1],
    //       ['Distance Covered', '11.2 km'],
    //     ],
    //   },
      goalkeeperStats: {
        'Manuel Neuer (Bayern Munich)': [
          ['Saves', 5],
          ['Reflex Saves', 3],
          ['Punches', 1],
          ['Claims', 1],
          ['Successful Passes/Total Passes', '18/20'],
        ],
        'Keylor Navas (PSG)': [
          ['Saves', 6],
          ['Reflex Saves', 2],
          ['Punches', 1],
          ['Claims', 3],
          ['Successful Passes/Total Passes', '22/26'],
        ],
      },
      defensiveStats: {
        'David Alaba (Bayern Munich)': [
          ['Successful Tackles/Attempts', '2/3'],
          ['Clearances', 4],
          ['Interceptions', 2],
          ['Fouls Committed', 1],
          ['Duels Won/Lost', '7/3'],
        ],
        'Marquinhos (PSG)': [
          ['Successful Tackles/Attempts', '3/3'],
          ['Clearances', 6],
          ['Interceptions', 1],
          ['Fouls Committed', 2],
          ['Duels Won/Lost', '8/4'],
        ],
      },
      midfieldStats: {
        'Joshua Kimmich (Bayern Munich)': [
          ['Successful Passes/Total Passes', '65/70'],
          ['Successful Dribbles/Attempts', '3/3'],
          ['Duels Won/Lost', '12/6'],
          ['Fouls Committed', 1],
          ['Interceptions', 3],
        ],
        'Marco Verratti (PSG)': [
          ['Successful Passes/Total Passes', '50/55'],
          ['Successful Dribbles/Attempts', '2/2'],
          ['Duels Won/Lost', '10/4'],
          ['Fouls Committed', 3],
          ['Interceptions', 2],
        ],
      },
      attackingStats: {
        'Robert Lewandowski (Bayern Munich)': [
          ['Successful Shots/Total Shots', '5/6'],
          ['Successful Dribbles/Attempts', '3/4'],
          ['Assists', 1],
          ['Fouls Suffered', 2],
          ['Goals Scored', 1],
        ],
        'Neymar Jr (PSG)': [
          ['Successful Shots/Total Shots', '4/5'],
          ['Successful Dribbles/Attempts', '5/6'],
          ['Assists', 2],
          ['Fouls Suffered', 3],
          ['Goals Scored', 1],
        ],
      },      
    },
  ];
  