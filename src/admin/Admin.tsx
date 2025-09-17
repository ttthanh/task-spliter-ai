import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip } from 'recharts';
import AssignTask from '../assign_task/AssignTask';
import { SelectField, Grid, Card, Heading } from '@aws-amplify/ui-react';
import TeamName from '../enum_data/team_name';
import { useState, useEffect } from 'react';

function Admin() {
    const [selectedTeam, setSelectedTeam] = useState<string>(TeamName.LinkinPark);
    useEffect(() => {
        fetch('https://il1rx6j6ba.execute-api.ap-southeast-1.amazonaws.com/prod/get-all-user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    })
                    .then(response => {
                        if (!response.ok) {
                            console.log(response);
                            throw new Error('Network response was not ok');
                        }

                        return response.json(); 
                        
                        }).then(data => {
                            // Work with the fetched data
                            console.log(data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    }, []);

    

    return (
        <>
            <Grid
                columnGap="0.5rem"
                rowGap="0.5rem"
                templateColumns="1fr 1fr 1fr 1fr"
                templateRows="50px 500px minmax(400px, 900px)"
            >
                <Card
                    columnStart="1"
                    columnEnd="-1"
                >

                    <Heading
                        width='30vw'
                        level={6}
                    >
                        Heading text
                    </Heading>
                </Card>
                <Card
                    columnStart="1"
                    columnEnd="3"
                >
                    <SelectField
                        label="Team Name" value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}>
                        {
                            Object.entries(TeamName).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {key}
                                </option>
                            ))
                        }
                    </SelectField>
                    <ResponsiveContainer
                        height="100%"
                        width="100%"
                    >
                        <BarChart
                            accessibilityLayer
                            barCategoryGap="10%"
                            barGap={4}
                            data={[
                                {
                                    amt: 1400,
                                    name: 'Page A',
                                    pv: 800,
                                    uv: 590
                                },
                                {
                                    amt: 1400,
                                    name: 'Page B',
                                    pv: 800,
                                    uv: 590
                                },
                                {
                                    amt: 1506,
                                    name: 'Page C',
                                    pv: 967,
                                    uv: 868
                                },
                                {
                                    amt: 989,
                                    name: 'Page D',
                                    pv: 1098,
                                    uv: 1397
                                },
                                {
                                    amt: 1228,
                                    name: 'Page E',
                                    pv: 1200,
                                    uv: 1480
                                },
                                {
                                    amt: 1100,
                                    name: 'Page F',
                                    pv: 1108,
                                    uv: 1520
                                },
                                {
                                    amt: 1700,
                                    name: 'Page G',
                                    pv: 680,
                                    uv: 1400
                                }
                            ]}
                            height={300}
                            margin={{
                                bottom: 5,
                                left: 20,
                                right: 30,
                                top: 20
                            }}
                            syncMethod="index"
                            width={500}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend
                                onClick={function CG() { }}
                                onMouseEnter={function CG() { }}
                                onMouseOut={function CG() { }}
                            />
                            <Bar
                                activeBar={{
                                    fill: 'gold'
                                }}
                                dataKey="pv"
                                fill="#8884d8"
                                stackId="a"
                            />
                            <Bar
                                activeBar={{
                                    fill: 'silver'
                                }}
                                dataKey="uv"
                                fill="#82ca9d"
                                stackId="a"
                            />
                            <Tooltip
                                defaultIndex={1}
                            />
                           
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card
                    columnStart="3"
                    columnEnd="-1"
                >
                    Main
                </Card>
                <Card
                    columnStart="1"
                    columnEnd="-1"
                >

                    <div className='mt-7'>
                        <AssignTask selectedTeam={selectedTeam} />
                    </div>
                </Card>
            </Grid>
        </>

    );
}

export default Admin;