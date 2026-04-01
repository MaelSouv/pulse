import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
//import { User } from '../users/user.entity';
//import { EventParticipant } from '../event-participants/event-participant.entity';
//import { Message } from '../messages/message.entity';
//import { Ride } from '../rides/ride.entity';

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ length: 255 })
    location: string;

    @Column({ length: 80, nullable: true })
    category: string;

    @Column({ type: 'int', default: 0 })
    capacity: number;

    @Column({ name: 'organizer_id' })
    organizerId: number;

    //@ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
    //@JoinColumn({ name: 'organizer_id' })
    //organizer: User;

    //@OneToMany(() => EventParticipant, (ep) => ep.event)
    //participants: EventParticipant[];

    //@OneToMany(() => Message, (m) => m.event)
    //messages: Message[];

    //@OneToMany(() => Ride, (r) => r.event)
    //rides: Ride[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}