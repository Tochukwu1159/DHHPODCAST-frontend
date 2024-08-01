// import React, { useEffect, useState } from 'react';
// import { useAllGetPodcast } from '../api/podcast'; // Make sure you have an API hook to get all podcasts
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import styled from 'styled-components';

// const Container = styled.div`
//   padding: 20px;
//   height: 100%;
//   overflow-y: auto;
// `;

// const Loader = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   width: 100%;
// `;

// const AllPodcas = () => {
//   const { data: podcasts, isLoading, error } = useAllGetPodcast();
//   console.log(podcasts, "podcasts")

//   if (isLoading) {
//     return (
//       <Loader>
//         <CircularProgress />
//       </Loader>
//     );
//   }

//   if (error) {
//     return <div>Error loading podcasts</div>;
//   }

//   return (
//     <Container>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//             <TableCell>S/N</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Image</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Subscription Plan</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {podcasts?.map((podcast) => (
//               <TableRow key={podcast.id}>
//                 <TableCell>{podcast.id}</TableCell>
//                 <TableCell>{podcast.title}</TableCell>
//                 <TableCell><img src={podcast.image} alt={podcast.title} style={{ width: '50px', height: '50px' }} /></TableCell>
//                 <TableCell>{podcast.description}</TableCell>
//                 <TableCell>{podcast.subscriptionPlan}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default AllPodcasts;
